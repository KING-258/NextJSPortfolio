"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, ExternalLink, GitFork, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "C++": "#F34B7D",
  Cuda: "#3A4E3A",
  HTML: "#E34C26",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
};

const AI_KEYWORDS = ["ml", "ai", "model", "neural", "llm", "deep", "vision", "rl", "jarvis", "cuda", "dl", "crowd", "pacman", "agent", "bigdata", "snake", "cv_snake"];
const WEB_KEYWORDS = ["web", "react", "next", "html", "css", "movie", "animation", "card", "local"];
const BACKEND_KEYWORDS = ["api", "server", "backend", "email", "node"];

type Filter = "all" | "ai-ml" | "web" | "backend" | "other";

function categorize(repo: Repo): Filter {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  const check = (kws: string[]) =>
    kws.some((kw) => name.includes(kw) || desc.includes(kw));

  if (check(AI_KEYWORDS)) return "ai-ml";
  if (check(WEB_KEYWORDS)) return "web";
  if (check(BACKEND_KEYWORDS)) return "backend";
  return "other";
}

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "AI/ML", value: "ai-ml" },
  { label: "Web", value: "web" },
  { label: "Backend", value: "backend" },
  { label: "Other", value: "other" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function Projects({ repos }: { repos: Repo[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [sortBy, setSortBy] = useState<"updated" | "stars">("updated");
  const [showAll, setShowAll] = useState(false);

  const sorted = [...repos].sort((a, b) => {
    if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });

  const filtered =
    activeFilter === "all"
      ? sorted
      : sorted.filter((r) => categorize(r) === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 9);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Projects"
          title="What I've Built"
          description="A collection of projects spanning AI/ML, web development, and systems programming."
        />

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setActiveFilter(f.value); setShowAll(false); }}
                className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-accent text-white"
                    : "border border-border text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("updated")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                sortBy === "updated"
                  ? "bg-surface-light text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSortBy("stars")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                sortBy === "stars"
                  ? "bg-surface-light text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Stars
            </button>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((repo, i) => (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass-card rounded-xl p-6 hover-glow transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg group-hover:text-accent-light transition-colors leading-tight">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-3 text-muted shrink-0">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                  {repo.description || getDescription(repo.name)}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-border">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#888",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock size={12} /> {timeAgo(repo.pushed_at)}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <Github size={16} />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-accent-light transition-colors"
                        aria-label={`View ${repo.name} demo`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 9 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 border border-border text-sm rounded-lg hover:border-accent/50 hover:text-accent-light transition-all"
            >
              Show All ({filtered.length} projects)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function getDescription(name: string): string {
  const map: Record<string, string> = {
    "PacMan-RL": "Reinforcement learning agent for Pac-Man with Q-learning.",
    "J.A.R.V.I.S": "AI personal assistant with NLP and automation.",
    CV_Snake: "Computer vision Snake game with hand gesture recognition.",
    DL_Lab: "Deep learning lab — neural networks, training, optimization.",
    CVAT_AR: "Computer vision annotation tool with AR features.",
    ImageCUDA: "CUDA-accelerated image processing pipeline.",
    "Crowd-Project": "Crowd density estimation with computer vision.",
    "email-agent": "AI email automation agent.",
    VisionM: "Multi-modal vision model pipeline.",
    BigDataAnalytics: "Big data analytics with PySpark.",
    Sentiment_Analyzer_BigData: "Large-scale sentiment analysis with distributed NLP.",
    Dino_Chrome: "AI agent that plays the Chrome Dino game using RL.",
    PCAP_Lab: "Parallel computing lab with CUDA and OpenMP.",
    "N-Puzzle": "N-Puzzle solver with search algorithms.",
    Animation: "JavaScript animation experiments and demos.",
    Cards: "Interactive card UI components.",
    Local: "Local-first application development.",
    MovieBuilder: "Movie discovery and recommendation app.",
  };
  return map[name] || "A software engineering project.";
}
