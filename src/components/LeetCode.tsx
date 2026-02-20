"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Trophy, Target, Percent, Flame } from "lucide-react";

interface LeetCodeStats {
  username: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  totalQuestions: number;
  acceptanceRate: number | null;
  contributionPoints: number;
  submissionCalendar: Record<string, number>;
}

function ProgressRing({
  value,
  max,
  size = 90,
  strokeWidth = 6,
  color,
  label,
  count,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
  count: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? (value / max) * 100 : 0;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="progress-ring-circle"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{count}</span>
          <span className="text-[10px] text-muted">/{max}</span>
        </div>
      </div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

function SubmissionHeatmap({ calendar }: { calendar: Record<string, number> }) {
  const weeks = useMemo(() => {
    const now = new Date();
    const result: { date: Date; count: number }[][] = [];
    // Show last 20 weeks
    const totalDays = 20 * 7;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - totalDays + 1);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let week: { date: Date; count: number }[] = [];
    for (let i = 0; i < totalDays + 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      if (d > now) break;

      const ts = Math.floor(
        new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000
      ).toString();
      week.push({ date: d, count: calendar[ts] || 0 });

      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    }
    if (week.length > 0) result.push(week);
    return result;
  }, [calendar]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/[0.03]";
    if (count <= 2) return "bg-accent/20";
    if (count <= 5) return "bg-accent/40";
    if (count <= 15) return "bg-accent/60";
    return "bg-accent";
  };

  return (
    <div className="flex gap-[3px] justify-center overflow-hidden">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => (
            <div
              key={di}
              className={`w-[10px] h-[10px] rounded-[2px] ${getColor(day.count)} transition-colors`}
              title={`${day.date.toLocaleDateString()}: ${day.count} submissions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://leetcode-stats.tashif.codes/KING-258")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setStats({
            username: "KING-258",
            ranking: data.ranking || null,
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            totalEasy: data.totalEasy || 830,
            totalMedium: data.totalMedium || 1740,
            totalHard: data.totalHard || 780,
            totalQuestions: data.totalQuestions || 3846,
            acceptanceRate: data.acceptanceRate || null,
            contributionPoints: data.contributionPoints || 0,
            submissionCalendar: data.submissionCalendar || {},
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="leetcode" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="LeetCode"
          title="Problem Solving"
          description="Strong foundation in Data Structures & Algorithms."
        />

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stats && stats.totalSolved > 0 ? (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <Trophy size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-2xl font-bold">{stats.totalSolved}</p>
                <p className="text-xs text-muted mt-1">Problems Solved</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <Target size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {stats.ranking ? stats.ranking.toLocaleString() : "—"}
                </p>
                <p className="text-xs text-muted mt-1">Global Ranking</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <Percent size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {stats.acceptanceRate ? `${stats.acceptanceRate.toFixed(1)}%` : "—"}
                </p>
                <p className="text-xs text-muted mt-1">Acceptance Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <Flame size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-2xl font-bold">{stats.contributionPoints}</p>
                <p className="text-xs text-muted mt-1">Contributions</p>
              </motion.div>
            </div>

            {/* Progress rings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-xl p-8"
            >
              <h3 className="text-center text-sm font-mono text-muted tracking-widest uppercase mb-8">
                Difficulty Breakdown
              </h3>
              <div className="flex justify-center gap-12 flex-wrap">
                <ProgressRing
                  value={stats.easySolved}
                  max={stats.totalEasy}
                  color="#22c55e"
                  label="Easy"
                  count={stats.easySolved}
                />
                <ProgressRing
                  value={stats.mediumSolved}
                  max={stats.totalMedium}
                  color="#f59e0b"
                  label="Medium"
                  count={stats.mediumSolved}
                />
                <ProgressRing
                  value={stats.hardSolved}
                  max={stats.totalHard}
                  color="#ef4444"
                  label="Hard"
                  count={stats.hardSolved}
                />
              </div>
            </motion.div>

            {/* Submission heatmap */}
            {stats.submissionCalendar && Object.keys(stats.submissionCalendar).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="text-center text-sm font-mono text-muted tracking-widest uppercase mb-6">
                  Recent Activity
                </h3>
                <SubmissionHeatmap calendar={stats.submissionCalendar} />
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-[10px] text-muted">Less</span>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.03]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-accent/20" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-accent/40" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-accent/60" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-accent" />
                  <span className="text-[10px] text-muted">More</span>
                </div>
              </motion.div>
            )}
            {/* CTA */}
            <div className="text-center">
              <a
                href={`https://leetcode.com/u/${stats.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm rounded-lg hover:border-accent/50 hover:text-accent-light transition-all"
              >
                View Full Profile on LeetCode →
              </a>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">Unable to load LeetCode stats.</p>
        )}
      </div>
    </section>
  );
}
