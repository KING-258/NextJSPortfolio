"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Github } from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function useTypingLoop(text: string, typeSpeed = 90, deleteSpeed = 50, pauseAfterType = 2000, pauseAfterDelete = 800, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "paused" | "deleting" | "deleted">("waiting");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "waiting") {
      timer = setTimeout(() => setPhase("typing"), startDelay);
    } else if (phase === "typing") {
      if (displayed.length < text.length) {
        timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("paused"), pauseAfterType);
      }
    } else if (phase === "paused") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      } else {
        timer = setTimeout(() => setPhase("typing"), pauseAfterDelete);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, text, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, startDelay]);

  return { displayed, typing: phase === "typing" || phase === "deleting" };
}

export default function Hero() {
  const { displayed: nameText } = useTypingLoop("Amulya Parashar");

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-ring" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-ring" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent-light text-sm font-mono tracking-widest uppercase mb-6">
            AI/ML Engineer
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-2"
        >
          <span className="gradient-text">{nameText}</span>
          <span className="inline-block w-[3px] h-[0.8em] bg-accent-light ml-1 animate-blink align-middle" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="text-xl md:text-2xl text-muted font-medium mb-6"
        >
          Building <span className="text-foreground">Intelligent Systems</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Specializing in Deep Learning, LLMs, Computer Vision &amp;
          Reinforcement Learning. Turning complex problems into elegant,
          data-driven solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dim text-white rounded-lg font-medium transition-all duration-200 hover-glow"
          >
            View Projects
            <ArrowDown size={16} />
          </a>
          <a
            href={`${BASE_PATH}/resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border hover:border-accent/50 text-foreground rounded-lg font-medium transition-all duration-200"
          >
            <FileText size={16} />
            Download Resume
          </a>
          <a
            href="https://github.com/KING-258"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border hover:border-accent/50 text-foreground rounded-lg font-medium transition-all duration-200"
          >
            <Github size={16} />
            GitHub
          </a>
        </motion.div>

        {/* Terminal intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 max-w-lg mx-auto"
        >
          <div className="glass-card rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-muted font-mono">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm text-left">
              <p className="text-muted">
                <span className="text-accent-light">$</span> whoami
              </p>
              <p className="text-foreground mt-1">Amulya Parashar</p>
              <p className="text-muted mt-2">
                <span className="text-accent-light">$</span> cat focus.txt
              </p>
              <p className="text-foreground mt-1">
                Deep Learning · LLMs · Computer Vision · RL
              </p>
              <p className="text-muted mt-2">
                <span className="text-accent-light">$</span> echo $UNIVERSITY
              </p>
              <p className="text-foreground mt-1">MIT Manipal — B.Tech CSE (AI &amp; ML)</p>
              <p className="text-muted mt-2">
                <span className="text-accent-light">$</span>{" "}
                <span className="animate-pulse">▊</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
