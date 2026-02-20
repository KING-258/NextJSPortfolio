"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <p className="text-accent-light text-sm font-mono tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
