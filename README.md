# Greg Ferreira — Interactive Developer Portfolio

An interactive 3D web experience built with Next.js, Three.js, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D**: Three.js + React Three Fiber + Drei
- **Animation**: Framer Motion + GSAP
- **Scroll**: Lenis

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Sections

1. **Hero** — 3D scene, staggered typography, particle field
2. **Projects** — GSAP horizontal scroll sequence
3. **DevTrack** — Animated architecture visualization
4. **About** — Identity timeline
5. **Tech Stack** — Filterable technology constellation
6. **GitHub** — Developer dashboard (API-ready)
7. **Contact** — System Complete interaction

## Personalization

Update `src/lib/constants.ts` with your real:
- Email address
- GitHub username/URL
- LinkedIn URL
- Project details

## GitHub API Integration

In `src/components/sections/GitHub.tsx`, replace mock data with:
```ts
const res = await fetch(`https://api.github.com/users/${PERSONAL.githubUser}`);
```

## Deploy

```bash
npm run build
```

Optimized for Vercel deployment.
