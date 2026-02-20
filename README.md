# Amulya Parashar — AI/ML Engineer Portfolio

A high-performance, modern portfolio website built with Next.js 15, TypeScript, and TailwindCSS. Designed to showcase AI/ML engineering work with dynamic data from GitHub and LeetCode APIs.

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata, structured data
│   ├── page.tsx            # Entry point → HomeClient
│   ├── globals.css         # Custom dark theme, animations, utilities
│   └── api/
│       ├── github/route.ts   # GitHub repos API (cached, filtered)
│       ├── leetcode/route.ts # LeetCode stats via GraphQL
│       └── contact/route.ts  # Email sending with rate limiting
├── components/
│   ├── HomeClient.tsx       # Main orchestrator (data fetching + composition)
│   ├── NeuralBackground.tsx # Canvas neural network animation
│   ├── Navbar.tsx           # Fixed nav with mobile menu
│   ├── Hero.tsx             # Hero with terminal intro
│   ├── About.tsx            # Bio, expertise grid, timeline
│   ├── FeaturedProjects.tsx # AI/ML project spotlight
│   ├── Projects.tsx         # All repos with filters + sorting
│   ├── LeetCode.tsx         # Stats cards + progress rings
│   ├── Skills.tsx           # Categorized skill tags
│   ├── Resume.tsx           # PDF preview + download
│   ├── Contact.tsx          # Form with validation + toast
│   ├── Footer.tsx           # Social links
│   └── SectionHeading.tsx   # Reusable animated heading
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email:** Nodemailer
- **Deployment:** Vercel

## Key Features

- Dynamic GitHub repository fetching (auto-categorized, filtered, sorted)
- LeetCode stats with progress rings (via GraphQL API)
- AI/ML project auto-detection and featured section
- Working contact form with email delivery and rate limiting
- Neural network canvas background animation
- Terminal-style intro
- Fully responsive (mobile, tablet, desktop)
- SEO optimized (OpenGraph, structured data, sitemap)
- Dark mode default with premium indigo accent

## Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required for contact form:
- `EMAIL_SERVICE` — Email service (default: `gmail`)
- `EMAIL_USER` — Your Gmail address
- `EMAIL_PASS` — Gmail App Password (not your regular password)
- `EMAIL_TO` — Receiving email address

Optional:
- `GITHUB_TOKEN` — GitHub personal access token (increases API rate limit)

### Resume

Place your resume PDF at `public/resume.pdf` for the preview and download features.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

## Deployment (Vercel)

1. Push to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

The site will automatically deploy on every push to main.

## Security

- Server-side input sanitization
- Rate limiting on contact form (3 requests/hour per IP)
- Environment variables for all secrets
- HTML injection prevention
