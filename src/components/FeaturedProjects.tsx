"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

// Exact featured projects in display order
const FEATURED_ORDER = ["VisionM", "PacMan-RL", "email-agent", "J.A.R.V.I.S", "Sentiment_Analyzer_BigData", "Dino_Chrome"];

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "C++": "#F34B7D",
  Cuda: "#3A4E3A",
  HTML: "#E34C26",
  Rust: "#DEA584",
};

export default function FeaturedProjects({ repos }: { repos: Repo[] }) {
  const repoMap = new Map(repos.map((r) => [r.name, r]));
  const featured = FEATURED_ORDER.map((name) => repoMap.get(name)).filter(Boolean) as Repo[];

  if (featured.length === 0) return null;

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="AI/ML Focus"
          title="Intelligent Systems I've Built"
          description="Projects that demonstrate depth in machine learning, deep learning, computer vision, and reinforcement learning."
        />

        <div className="grid gap-6">
          {featured.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-8 hover-glow transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles size={18} className="text-accent-light" />
                    <h3 className="text-xl font-bold group-hover:text-accent-light transition-colors">
                      {repo.name}
                    </h3>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-sm text-muted">
                        <Star size={14} /> {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                  <p className="text-muted leading-relaxed mb-4">
                    {repo.description || getAIDescription(repo.name)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-border"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] || "#888",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {getProjectTags(repo.name).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-accent/50 transition-colors"
                  >
                    <Github size={14} /> Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-dim transition-colors"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getAIDescription(name: string): string {
  const descriptions: Record<string, string> = {
    VisionM: "Vision model pipeline for multi-modal AI applications and visual understanding.",
    "PacMan-RL": "Reinforcement learning agent trained to play Pac-Man using policy gradients and Q-learning algorithms.",
    "email-agent": "Intelligent email automation agent with AI-driven response generation and classification.",
    "J.A.R.V.I.S": "AI-powered personal assistant system with natural language understanding and task automation capabilities.",
    Sentiment_Analyzer_BigData: "Large-scale sentiment analysis pipeline using distributed computing and NLP on big data.",
    Dino_Chrome: "AI agent that learns to play the Chrome Dino game using reinforcement learning and computer vision.",
  };
  return descriptions[name] || "An AI/ML engineering project exploring intelligent system design.";
}

function getProjectTags(name: string): string[] {
  const tags: Record<string, string[]> = {
    VisionM: ["Computer Vision", "TypeScript", "Multi-Modal"],
    "PacMan-RL": ["Reinforcement Learning", "Q-Learning", "OpenAI Gym"],
    "email-agent": ["AI Agent", "NLP", "Automation"],
    "J.A.R.V.I.S": ["AI Assistant", "NLP", "Automation"],
    Sentiment_Analyzer_BigData: ["NLP", "Big Data", "Sentiment Analysis"],
    Dino_Chrome: ["Reinforcement Learning", "Computer Vision", "Automation"],
  };
  return tags[name] || ["AI/ML"];
}
