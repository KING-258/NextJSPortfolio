"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOverInteractive);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOverInteractive);
    };
  }, [visible]);

  if (!visible) return null;

  const ringSize = hovering ? 48 : 36;
  const dotSize = 6;

  return (
    <>
      {/* Outer ring */}
      <div
        className="custom-cursor-ring"
        style={{
          width: ringSize,
          height: ringSize,
          transform: `translate(${pos.x - ringSize / 2}px, ${pos.y - ringSize / 2}px) scale(${clicking ? 0.85 : 1})`,
        }}
      />
      {/* Inner dot */}
      <div
        className="custom-cursor-dot"
        style={{
          width: dotSize,
          height: dotSize,
          transform: `translate(${pos.x - dotSize / 2}px, ${pos.y - dotSize / 2}px)`,
        }}
      />
    </>
  );
}
