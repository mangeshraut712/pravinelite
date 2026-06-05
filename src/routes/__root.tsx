import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState } from "react";

import appCss from "../styles.css?url";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { FitnessChatbot } from "@/components/FitnessChatbot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl text-gradient-gold">404</div>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-background shadow-gold transition-transform hover:scale-105"
          >
            Go home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-6xl text-gradient-fire">Oops!</div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-background shadow-gold transition-transform hover:scale-105"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pravin Elite Fitness - Pune's Premier Personal Trainer" },
      {
        name: "description",
        content:
          "Pune's premier personal trainer. 1500+ transformations. In-Gym, At-Home & Online coaching for fat loss, muscle gain, PCOS & more.",
      },
      {
        name: "keywords",
        content:
          "personal trainer Pune, fitness coach, weight loss, muscle gain, PCOS diet, online coaching, at-home training, Indian nutrition plan, fat loss transformation",
      },
      { name: "author", content: "Pravin Elite Fitness" },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: "Pravin Elite Fitness - Pune's Premier Personal Trainer" },
      {
        property: "og:description",
        content:
          "1500+ body transformations in Pune. Custom Indian diet plans. Book your free consultation today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pravinelitefit.com" },
      { property: "og:image", content: "/logo.png" },
      { property: "og:locale", content: "en_IN" },
      { name: "theme-color", content: "#0A0A0A" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@PravinEliteFitness" },
      { name: "twitter:title", content: "Pravin Elite Fitness - Pune's Premier Personal Trainer" },
      {
        name: "twitter:description",
        content:
          "1500+ body transformations in Pune. Custom Indian diet plans. Book your free consultation today.",
      },
      { name: "twitter:image", content: "/logo.png" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital@1&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              name: "Pravin Elite Fitness",
              description:
                "Personal training, at-home coaching, online coaching, and Indian nutrition plans in Pune, Maharashtra.",
              telephone: "+91-9272432562",
              url: "https://pravinelitefit.com",
              image: "/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "MH",
                addressCountry: "IN",
              },
              areaServed: "Pune, Maharashtra, India",
              priceRange: "₹4,999 - ₹26,999",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "06:00",
                  closes: "21:00",
                },
              ],
              sameAs: [
                "https://www.instagram.com/pravinelitefitness_india",
                "https://www.youtube.com/@PravinEliteFitness",
              ],
            },
            {
              "@type": "Person",
              name: "Pravin",
              jobTitle: "Personal Trainer",
              description:
                "Pravin is a certified personal trainer in Pune with 5+ years of experience and 1500+ client transformations.",
              url: "https://pravinelitefit.com/about",
              sameAs: [
                "https://www.instagram.com/pravinelitefitness_india",
                "https://www.youtube.com/@PravinEliteFitness",
              ],
              worksFor: {
                "@type": "LocalBusiness",
                name: "Pravin Elite Fitness",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: "smooth" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <BackToTop hidden={chatOpen} />
      <WhatsAppFab hidden={chatOpen} />
      <FitnessChatbot isOpen={chatOpen} onOpenChange={setChatOpen} />
    </QueryClientProvider>
  );
}
