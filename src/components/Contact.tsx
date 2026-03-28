"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Clock, Mail } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/amulyaparashar258@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || "Not specified",
          message: form.message,
          _subject: `Portfolio Contact: ${form.name}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          description="Have a project in mind, or just want to chat about AI/ML? I'd love to hear from you."
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2 font-mono uppercase">
                Name <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-colors"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2 font-mono uppercase">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={100}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-colors"
                placeholder="john@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm text-muted mb-2 font-mono uppercase">
              Company <span className="text-muted/50">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              maxLength={100}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-colors"
              placeholder="Company"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-muted mb-2 font-mono uppercase">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              required
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-colors resize-none"
              placeholder="Message"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5"
          >
            {status === "loading" ? (
              <>
                <div className="w-4 h-4 border-2 border-surface-container border-t-transparent rounded-full animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Execute Transmission
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted font-mono uppercase">
            <Clock size={12} />
            <span>Response latencies {"<"} 24h.</span>
          </div>
        </motion.form>

        {/* Toast notifications */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "50%" }}
              animate={{ opacity: 1, y: 0, x: "0%" }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg animate-slide-in"
            >
              <CheckCircle size={18} />
              <span className="text-sm">Message sent successfully!</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg animate-slide-in"
            >
              <AlertCircle size={18} />
              <span className="text-sm">{errorMsg || "Failed to send."}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct email fallback */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted font-mono uppercase">
            Direct Endpoint:{" "}
            <a
              href="mailto:amulyaparashar258@gmail.com"
              className="text-primary hover:text-tertiary transition-colors inline-flex items-center gap-1"
            >
              <Mail size={12} /> amulyaparashar258@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
