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
              className="glass-card p-6 rounded-xl border border-border"
            >
              <h3 className="label-md text-primary mb-6">
                [ {cat.title} ]
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 text-xs font-mono uppercase rounded-full border border-border bg-surface-container-highest text-muted hover:border-tertiary hover:text-tertiary transition-all duration-300 cursor-default"
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
