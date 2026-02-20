"use client";

import { useEffect, useState } from "react";
import NeuralBackground from "./NeuralBackground";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import FeaturedProjects from "./FeaturedProjects";
import Projects from "./Projects";
import LeetCode from "./LeetCode";
import Skills from "./Skills";
import Resume from "./Resume";
import Contact from "./Contact";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

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
  fork: boolean;
  updated_at: string;
  created_at: string;
  pushed_at: string;
}

const EXCLUDED_REPOS = ["email-agent-react", "Torch", "torch"];

export default function HomeClient() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/KING-258/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(
            data.filter(
              (r: Repo) => !r.fork && !EXCLUDED_REPOS.includes(r.name)
            )
          );
        }
        setReposLoading(false);
      })
      .catch(() => setReposLoading(false));
  }, []);

  return (
    <>
      <CustomCursor />
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <FeaturedProjects repos={repos} />
        <Projects repos={repos} />
        <LeetCode />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
