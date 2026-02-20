"use client";

import { motion } from "framer-motion";
import { Download, FileText, GraduationCap, Briefcase, Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    details: "B.Tech CSE (AI & ML) — MIT Manipal, 2022–2026",
  },
  {
    icon: Code2,
    title: "Focus Areas",
    details: "Deep Learning, Computer Vision, Reinforcement Learning, LLMs, CUDA Programming",
  },
  {
    icon: Briefcase,
    title: "Experience",
    details: "AI/ML projects, full-stack development, open-source contributions",
  },
];

export default function Resume() {
  return (
    <section id="resume" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Resume"
          title="Background & Experience"
          description="A snapshot of my academic journey and technical experience."
        />

        {/* Key highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <item.icon size={24} className="text-accent-light mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.details}</p>
            </motion.div>
          ))}
        </div>

        {/* PDF Preview + Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-accent-light" />
              <span className="font-medium">Resume</span>
            </div>
            <a
              href={`${BASE_PATH}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-dim transition-colors"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
          <div className="bg-surface p-4">
            <iframe
              src={`${BASE_PATH}/resume.pdf`}
              className="w-full h-[600px] rounded-lg border border-border"
              title="Resume Preview"
            />
          </div>
          <div className="px-6 py-3 text-center">
          </div>
        </motion.div>
      </div>
    </section>
  );
}
