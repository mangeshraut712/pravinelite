# Pravin Elite Fitness

A cutting-edge, high-performance fitness website built with 2026 web technologies. Features React 19, TanStack Start, and modern CSS platform features for exceptional performance and user experience.

[![Live Site](https://img.shields.io/badge/Live-pravinelite--main.vercel.app-green?style=for-the-badge&logo=vercel)](https://pravinelite-main.vercel.app)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

## 🚀 2026 Tech Stack

### Core Framework
- **React 19** - Latest React with new Server Components, Actions, and use() API
- **TanStack Start** - Full-stack React framework with built-in SSR, streaming, and file-based routing
- **TypeScript 5.6** - Type-safe development with enhanced type inference
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
- **Cloudflare Workers** - Edge deployment with global CDN

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

## 📄 Pages

- **Home** (`/`) - Hero section, transformation stats, testimonials, CTA
- **About** (`/about`) - Coach profile, transformation stats, specialties, philosophy
- **Services** (`/services`) - In-gym, at-home, and online training options with pricing
- **Programs** (`/programs`) - 45-Day Challenge, 90-Day Transformation, Nutrition Only
- **Calculator** (`/calculator`) - BMI, BMR, TDEE, and macro split calculator (India-specific)
- **Blog** (`/blog`) - Articles on nutrition, PCOS, strength training with search and filters
- **Contact** (`/contact`) - Contact form with WhatsApp integration
- **Booking** (`/booking`) - Free consultation booking with calendar and time slots

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/pravinelite.git
cd pravinelite-main

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:8080
```

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
npx eslint src --ext .ts,.tsx

# Format code
npx prettier --write "src/**/*.{ts,tsx,css}"
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
│   ├── HeroSection.tsx     # Reusable hero section
│   ├── ScrollToTop.tsx      # Auto-scroll on route change
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
- Edge deployment
- Environment variables from `.env`
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
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Vercel Configuration

See `vercel.json` for build settings:
- Build command: `npm run build`
- Output directory: `dist/client`
- Framework: None (TanStack Start custom)

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: < 500KB (gzipped)
- **Image Optimization**: WebP with responsive sizes

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
