import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const mono = localFont({
  src: [
    {
      path: "./fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amulya Parashar | AI/ML Engineer",
  description:
    "AI/ML Engineer building intelligent systems. Specializing in Deep Learning, LLMs, Computer Vision, and Reinforcement Learning. BTech CSE AI & ML at MIT Manipal.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Deep Learning",
    "Machine Learning",
    "LLM",
    "Computer Vision",
    "Reinforcement Learning",
    "Amulya Parashar",
    "MIT Manipal",
    "Portfolio",
  ],
  authors: [{ name: "Amulya Parashar" }],
  creator: "Amulya Parashar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amulyaparashar.vercel.app",
    title: "Amulya Parashar | AI/ML Engineer",
    description:
      "AI/ML Engineer building intelligent systems. Deep Learning, LLMs, Computer Vision & Reinforcement Learning.",
    siteName: "Amulya Parashar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amulya Parashar | AI/ML Engineer",
    description:
      "AI/ML Engineer building intelligent systems. Deep Learning, LLMs, Computer Vision & Reinforcement Learning.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Amulya Parashar",
              url: "https://amulyaparashar.vercel.app",
              jobTitle: "AI/ML Engineer",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "MIT Manipal",
              },
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Artificial Intelligence",
                "Computer Vision",
                "Reinforcement Learning",
                "Natural Language Processing",
              ],
              sameAs: [
                "https://github.com/KING-258",
                "https://leetcode.com/u/KING-258",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
