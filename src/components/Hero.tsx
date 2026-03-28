"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Github, Terminal } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-ring" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl animate-pulse-ring" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Typography */}
        <div className="text-left text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-tertiary label-md mb-6 inline-block bg-surface-container px-3 py-1 rounded-full border border-border">
              ECHO // NEURAL_NETWORKS
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="display-lg mb-4"
          >
            <span className="gradient-text">{nameText}</span>
            <span className="inline-block w-[3px] h-[0.8em] bg-primary-container ml-2 animate-blink align-middle" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="text-2xl text-muted font-medium mb-6 font-display"
          >
            Building <span className="text-foreground">Intelligent Systems</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted max-w-xl mb-10 leading-relaxed lg:mx-0 mx-auto"
          >
            Specializing in Deep Learning, LLMs, Computer Vision &amp; Reinforcement Learning.
            Turning complex problems into elegant, multi-dimensional structures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5"
            >
              Initialize Node
              <ArrowDown size={16} />
            </a>
            <a
              href={`${BASE_PATH}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-3.5 text-foreground"
            >
              <FileText size={16} />
              Resume Array
            </a>
            <a
              href="https://github.com/KING-258"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-3.5 text-foreground"
            >
              <Github size={16} />
              GitHub Repo
            </a>
          </motion.div>
        </div>

        {/* Right column - Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <div className="glass-card rounded-xl w-full max-w-lg shadow-2xl relative overflow-visible glow">
            {/* Corner glowing accent */}
            <div className="absolute -top-1 -left-1 w-8 h-8 rounded-tl-xl border-t-2 border-l-2 border-primary z-20"></div>

            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-container-highest/80 backdrop-blur-md">
              <Terminal size={14} className="text-muted" />
              <div className="flex-1" />
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container" />
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container" />
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container" />
              </div>
            </div>
            
            <div className="p-6 font-mono text-sm text-left bg-surface-container-low/50">
              <div className="space-y-4">
                <div className="group">
                  <p className="text-muted">
                    <span className="text-tertiary">obsidian@local</span>: <span className="text-primary">~</span>$ whoami
                  </p>
                  <p className="text-foreground mt-1 ml-4 group-hover:text-primary transition-colors">Amulya Parashar</p>
                </div>
                
                <div className="group">
                  <p className="text-muted">
                    <span className="text-tertiary">obsidian@local</span>: <span className="text-primary">~</span>$ cat kernel.log | grep "focus"
                  </p>
                  <p className="text-foreground mt-1 ml-4 group-hover:text-tertiary transition-colors">
                    [OK] Deep Learning Module Loaded<br/>
                    [OK] LLMs & Transformers Active<br/>
                    [OK] Computer Vision Systems Online<br/>
                    [OK] Reinforcement Learning Policies Converged
                  </p>
                </div>
                
                <div className="group">
                  <p className="text-muted">
                    <span className="text-tertiary">obsidian@local</span>: <span className="text-primary">~</span>$ get_location --precise
                  </p>
                  <p className="text-foreground mt-1 ml-4">Vector Space: MIT Manipal — B.Tech CSE (AI &amp; ML)</p>
                </div>
                
                <div>
                  <p className="text-muted flex items-center gap-2">
                    <span className="text-tertiary">obsidian@local</span>: <span className="text-primary">~</span>${" "}
                    <span className="animate-blink block w-2 h-4 bg-primary"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
