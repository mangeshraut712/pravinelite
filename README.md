# Pravin Elite Fitness

A modern, high-performance fitness website built with React, TypeScript, and TanStack Router.

## Features

- **Modern Tech Stack**: React 19, TypeScript, TanStack Router, Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and reduced motion support
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, and structured data
- **Animations**: Smooth animations using Framer Motion with LazyMotion for performance
- **Components**: Reusable UI components with shadcn/ui

## Pages

- **Home**: Hero section, testimonials, transformation gallery
- **About**: Coach profile, stats, specialties, philosophy
- **Services**: In-gym, at-home, and online training options
- **Programs**: 45-Day Challenge, 90-Day Transformation, Nutrition Only
- **Calculator**: BMI, BMR, TDEE, and macro split calculator (India-specific)
- **Blog**: Articles on nutrition, PCOS, strength training
- **Contact**: Contact form with WhatsApp integration
- **Booking**: Free consultation booking with calendar

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the site.

### Build

```bash
npm run build
```

### Type Check

```bash
npx tsc --noEmit
```

### Lint

```bash
npx eslint src --ext .ts,.tsx
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # FAQ, MarqueeBar, TransformationGallery
│   ├── ui/           # shadcn/ui components
│   └── WhatsAppFab.tsx
├── integrations/
│   └── supabase/     # Supabase client
├── routes/           # Page components
├── assets/           # Images
└── styles.css        # Tailwind CSS v4
```

## Tech Stack

- **Framework**: React 19
- **Router**: TanStack Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database**: Supabase
- **Deployment**: Cloudflare Workers

## Contact

- **Phone**: +91 92724 32562
- **Instagram**: https://www.instagram.com/pravinelitefitness_india
- **YouTube**: https://www.youtube.com/@PravinEliteFitness
- **Website**: https://pravinelitefit.com

## License

© 2024 Pravin Elite Fitness. All rights reserved.
