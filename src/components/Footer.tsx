"use client";

import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 bg-background/50 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-muted font-mono uppercase tracking-widest text-[10px]">
            &copy; {new Date().getFullYear()} Amulya Parashar. <span className="text-primary hover:text-tertiary transition-colors">System initialized.</span>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/KING-258"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-tertiary transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://leetcode.com/u/KING-258"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-tertiary transition-colors"
            aria-label="LeetCode"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
