# Pravin Elite Fitness

A production-ready fitness website for Pravin Elite Fitness, built with React 19, TanStack Start, Vercel SSR, and Supabase. It includes lead capture flows, an India-specific calculator, and a hybrid fitness chatbot that uses Gemini on the server when configured and falls back to a local expert mode when it is not.

[![Live Site](https://img.shields.io/badge/Live-pravinelite--main.vercel.app-green?style=for-the-badge&logo=vercel)](https://pravinelite-main.vercel.app)
[![Version](https://img.shields.io/badge/Version-2.0.0-gold?style=for-the-badge)](https://github.com/mangeshraut712/pravinelite/releases)
[![Deployments](https://img.shields.io/badge/Deployments-Active-blue?style=for-the-badge&logo=vercel)](https://pravinelite-main.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

## 🚀 2026 Tech Stack

### Core Framework

- **React 19** - Modern React runtime with improved compiler-era ergonomics
- **TanStack Start** - Full-stack React framework with SSR and file-based routing
- **TypeScript 5.8** - Type-safe development with strict checking
- **Vite 7** - Lightning-fast build tool with native ESM support

### Styling & UI

- **Tailwind CSS v4** - Next-gen utility-first CSS with native CSS nesting, container queries, and custom properties
- **shadcn/ui** - Modern, accessible component library built on Radix UI
- **Lucide React** - Beautiful, consistent icon library
- **CSS 2026 Features**:
  - `@view-transition` - Smooth cross-page transitions without JavaScript
  - `@starting-style` - Entry animations without JavaScript
  - `animation-timeline: view()` - Scroll-driven animations
  - `field-sizing: content` - Auto-sizing form fields
  - `content-visibility: auto` - Performance optimization for below-fold content
  - `interpolate-size` - Smooth height transitions
  - Native CSS Popover API
  - CSS Container Queries

### State & Data

- **TanStack Query v5** - Powerful data fetching with automatic caching, refetching, and background updates
- **React Hook Form** - Performant form handling with minimal re-renders
- **Zod** - TypeScript-first schema validation

### Animations

- **Framer Motion** - Production-ready motion library with LazyMotion for code-splitting
- **TanStack Router** - Built-in scroll restoration and preloading

### Backend & Database

- **Supabase** - Open-source Firebase alternative with PostgreSQL, Auth, and Realtime
- **Nitro + Vercel** - SSR runtime and deployment target for the production app

### Development Tools

- **ESLint 9** - Modern linting with flat config
- **Prettier** - Code formatting
- **TypeScript** - Strict type checking

## ✨ Key Features

### Performance

- **Edge Deployment** - Deployed on Vercel Edge for global low-latency access
- **Code Splitting** - Automatic route-based code splitting with TanStack Start
- **Image Optimization** - Responsive images with lazy loading
- **Query Caching** - 5-minute stale time with 30-minute garbage collection
- **Content Visibility** - CSS `content-visibility: auto` for below-fold sections
- **LazyMotion** - Animation library code-splitting for reduced bundle size

### Accessibility (WCAG 2.1 AA)

- **ARIA Labels** - Comprehensive ARIA attributes on all interactive elements
- **Keyboard Navigation** - Full keyboard support with visible focus states
- **Reduced Motion** - Respects `prefers-reduced-motion` media query
- **Semantic HTML** - Proper heading hierarchy and landmark regions
- **Color Contrast** - WCAG AA compliant color ratios
- **Screen Reader Support** - Screen reader-friendly content structure

### SEO & Discoverability

- **Meta Tags** - Comprehensive meta tags for search engines
- **Open Graph** - Rich social media previews
- **Twitter Cards** - Optimized Twitter sharing
- **Structured Data** - JSON-LD schema for LocalBusiness and Person
- **Sitemap** - Auto-generated XML sitemap
- **Robots.txt** - Search engine crawling directives

### User Experience

- **View Transitions** - Smooth cross-page navigation animations
- **Scroll-Driven Animations** - Elements reveal on scroll without JavaScript
- **Form Auto-Sizing** - Textareas auto-expand with `field-sizing: content`
- **Native Popovers** - Using CSS Popover API for tooltips and menus
- **Smooth Scrolling** - CSS smooth scroll behavior
- **Prefetching** - Intent-based route preloading for instant navigation
- **Hybrid Fitness Chatbot** - Server-backed Gemini replies when configured, local expert fallback when not

## 📄 Pages

- **Home** (`/`) - Hero section, transformation stats, testimonials, CTA
- **About** (`/about`) - Coach profile, transformation stats, specialties, philosophy
- **Services** (`/services`) - In-gym, at-home, and online training options with pricing
- **Programs** (`/programs`) - 45-Day Challenge, 90-Day Transformation, Nutrition Only
- **Calculator** (`/calculator`) - BMI, BMR, TDEE, and macro split calculator (India-specific)
- **Blog** (`/blog`) - Articles on nutrition, PCOS, strength training with search and filters
- **Contact** (`/contact`) - Contact form with WhatsApp integration
- **Booking** (`/booking`) - Free consultation booking with calendar and time slots
- **API Chat Route** (`/api/chat`) - Chat health check and server-side Gemini proxy

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 22.12+ (GitHub Actions uses Node 22; Vercel uses a supported LTS runtime)
- **npm** 9+ or **pnpm** 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/pravinelite.git
cd pravinelite-main

# Install dependencies
npm ci

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:8080
```

The chatbot works in two modes during development:

- `GEMINI_API_KEY` present: server-side Gemini mode through `/api/chat`
- `GEMINI_API_KEY` absent: local expert fallback mode

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code
npm run format

# React Codebase Audit (React Doctor)
npx react-doctor --score .
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx      # Navigation with mobile menu
│   │   └── Footer.tsx      # Footer with newsletter and social links
│   ├── sections/            # Reusable page sections
│   │   ├── FAQ.tsx         # Accordion FAQ component
│   │   ├── MarqueeBar.tsx  # Scrolling marquee
│   │   └── TransformationGallery.tsx
│   ├── ui/                  # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── BackToTop.tsx       # Back-to-top floating action
│   ├── FitnessChatbot.tsx  # Hybrid online/offline chatbot
│   ├── ScrollToTop.tsx     # Auto-scroll on route change
│   └── WhatsAppFab.tsx     # Floating WhatsApp button
├── integrations/
│   └── supabase/            # Supabase integration
│       ├── client.ts       # Browser client
│       ├── client.server.ts # Server client
│       ├── auth-attacher.ts
│       ├── auth-middleware.ts
│       └── types.ts        # Database types
├── routes/                  # File-based routing
│   ├── __root.tsx          # Root layout with meta tags
│   ├── index.tsx           # Home page
│   ├── about.tsx           # About page
│   ├── services.tsx        # Services page
│   ├── programs.tsx        # Programs page
│   ├── calculator.tsx      # Calculator page
│   ├── blog.tsx            # Blog page
│   ├── contact.tsx         # Contact page
│   ├── booking.tsx         # Booking page
│   └── sitemap.xml.ts      # Dynamic sitemap
├── hooks/
│   └── use-mobile.ts       # Mobile detection hook
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── error-capture.ts    # Error handling
│   └── error-page.ts       # Error page component
├── assets/                 # Static assets
│   ├── logo.png
│   ├── pravin-portrait.jpg
│   ├── hero-trainer.jpg
│   └── calculator-hero.jpg
├── styles.css              # Tailwind CSS v4 with custom theme
├── router.tsx              # TanStack Router configuration
├── routeTree.gen.ts        # Generated route tree
├── server.ts               # Server entry point
└── start.ts                # Application entry point
```

## 🎨 Design System

### Colors

- **Background**: Dark theme with oklch color space
- **Gold**: Primary accent (oklch(0.78 0.14 80))
- **Fire**: Secondary accent (oklch(0.68 0.18 45))
- **Gradients**: Hero, Gold, Fire, Card gradients

### Typography

- **Display**: Bebas Neue (headings)
- **Sans**: DM Sans (body text)
- **Serif**: Playfair Display (accents)
- **Mono**: JetBrains Mono (code)

### Components

- **Glass Effect**: Backdrop blur with subtle border
- **Grain Texture**: SVG noise overlay
- **Shadows**: Gold glow and card elevation
- **Animations**: Smooth transitions with Framer Motion

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

The project is configured with:

- Automatic builds on git push
- Nitro SSR output for Vercel
- Environment variables from the Vercel project settings
- Custom domain support

### Manual Deployment

```bash
# Build
npm run build

# Deploy dist/ to your hosting provider
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id

# Optional server-side chatbot key
GEMINI_API_KEY=your_gemini_api_key
```

### Vercel Configuration

See `vercel.json` for build settings:

- Build command: `npm run build`
- Dev command: `npm run dev`
- Install command: `npm ci`
- Nitro generates deployable output in `.vercel/output`

## 📊 Quality Snapshot

Latest local production-preview checks on 2026-06-06:

- **React Doctor**: `100 / 100`
- **Lighthouse Mobile**: Performance `78`, Accessibility `98`, Best Practices `100`, SEO `92`
- **Lighthouse Desktop**: Performance `96`, Accessibility `98`, Best Practices `100`, SEO `92`

Current performance bottleneck:

- The homepage mobile LCP is still image-heavy, primarily due to the hero and portrait assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

© 2026 Pravin Elite Fitness. All rights reserved.

## 📞 Contact

- **Phone**: +91 92724 32562
- **Instagram**: https://www.instagram.com/pravinelitefitness_india
- **YouTube**: https://www.youtube.com/@PravinEliteFitness
- **Website**: https://pravinelitefit.com
- **Email**: [Available on contact page]

## 🌐 Live Demo

[https://pravinelite-main.vercel.app](https://pravinelite-main.vercel.app)

## 🙏 Acknowledgments

- **TanStack** - For the amazing router and query libraries
- **shadcn** - For the beautiful UI components
- **Vercel** - For the deployment platform
- **Supabase** - For the backend infrastructure
