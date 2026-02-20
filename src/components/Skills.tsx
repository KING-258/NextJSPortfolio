"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface SkillCategory {
  title: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "AI / ML",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Keras",
      "Pandas",
      "NumPy",
      "OpenCV",
      "Hugging Face",
      "ONNX",
      "Weights & Biases",
      "MLflow",
      "CUDA",
    ],
  },
  {
    title: "Programming",
    skills: [
      "Python",
      "C++",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Bash",
      "Java",
    ],
  },
  {
    title: "Web & Frameworks",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "FastAPI",
      "Flask",
      "REST APIs",
      "TailwindCSS",
    ],
  },
  {
    title: "Tools & Infrastructure",
    skills: [
      "Git",
      "Docker",
      "Linux",
      "VS Code",
      "Jupyter",
      "Google Colab",
      "Vercel",
      "GitHub Actions",
      "PySpark",
      "MongoDB",
      "PostgreSQL",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Skills"
          title="Technical Arsenal"
          description="Tools and technologies I use to build intelligent systems."
        />

        <div className="space-y-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="text-sm font-mono text-accent-light tracking-widest uppercase mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm rounded-lg border border-border bg-surface-light/50 text-foreground hover:border-accent/40 hover:text-accent-light transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
