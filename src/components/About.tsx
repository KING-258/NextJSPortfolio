"use client";

import { motion } from "framer-motion";
import { Brain, Code, Cpu, Eye, Gamepad2, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";

const expertise = [
  { icon: Brain, label: "Machine Learning", desc: "Classical ML, ensemble methods, feature engineering" },
  { icon: Cpu, label: "Deep Learning", desc: "CNNs, RNNs, Transformers, training pipelines" },
  { icon: Eye, label: "Computer Vision", desc: "Object detection, image segmentation, CUDA acceleration" },
  { icon: Gamepad2, label: "Reinforcement Learning", desc: "Policy gradients, Q-learning, multi-agent systems" },
  { icon: Code, label: "LLMs & NLP", desc: "Language models, agents, prompt engineering" },
  { icon: Database, label: "Big Data & Analytics", desc: "Distributed computing, PySpark, data pipelines" },
];

const timeline = [
  { year: "2022", event: "Started B.Tech CSE (AI & ML) at MIT Manipal" },
  { year: "2023", event: "Deep Learning & Computer Vision research projects" },
  { year: "2024", event: "Built AI agents, CUDA-accelerated systems, RL environments" },
  { year: "2025", event: "Advanced LLM applications & full-stack AI systems" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="About"
          title="Engineering Intelligence"
          description="I approach AI/ML not as a set of tools, but as a discipline of systems thinking — designing architectures that learn, adapt, and scale."
        />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl p-8 mb-16 max-w-3xl mx-auto"
        >
          <p className="text-foreground leading-relaxed text-lg">
            I&apos;m <span className="text-accent-light font-semibold">Amulya Parashar</span>, a
            B.Tech Computer Science student specializing in AI &amp; ML at{" "}
            <span className="text-accent-light">MIT Manipal</span>. I build systems
            at the intersection of deep learning, computer vision, and reinforcement
            learning — from training neural networks on GPUs with CUDA to deploying
            intelligent agents that solve real-world problems.
          </p>
          <p className="text-muted leading-relaxed mt-4">
            My work spans PyTorch-based deep learning pipelines, CUDA-accelerated
            image processing, reinforcement learning environments, AI-powered assistants,
            and full-stack ML applications. I believe in writing clean, efficient code
            and building systems that are not just accurate, but also fast and scalable.
          </p>
        </motion.div>

        {/* Expertise grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {expertise.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-xl p-6 hover-glow transition-all duration-300"
            >
              <item.icon size={28} className="text-accent-light mb-4" />
              <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-sm font-mono text-muted tracking-widest uppercase mb-8">
            Journey
          </h3>
          <div className="relative border-l border-border pl-8 space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[2.55rem] top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                <span className="text-accent-light font-mono text-sm">{item.year}</span>
                <p className="text-foreground mt-1">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
