"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'primary' | 'tertiary';
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    const nodeCount = 75; // Increased density for high-tech look
    const connectionDistance = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 0.5,
          type: Math.random() > 0.8 ? 'tertiary' : 'primary', // 20% cyan, 80% indigo
        });
      }
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(167, 165, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      drawGrid(ctx, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25;
            ctx.beginPath();
            
            // Mix colors if different types connect
            if (nodes[i].type !== nodes[j].type) {
                ctx.strokeStyle = `rgba(105, 218, 255, ${opacity})`; // Tertiary glow
            } else {
                ctx.strokeStyle = `rgba(167, 165, 255, ${opacity})`; // Primary glow
            }

            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update nodes
      for (const node of nodes) {
        ctx.beginPath();
        const color = node.type === 'primary' ? '167, 165, 255' : '105, 218, 255';
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color}, 0.8)`;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset for lines

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
