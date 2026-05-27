import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { ArrowRight, Clock, Search, X } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & Blog — Pravin Elite Fitness" },
      {
        name: "description",
        content:
          "Practical guides on Indian nutrition, fat loss, PCOS, strength training and habit change — written for Indian bodies and lifestyles.",
      },
      { property: "og:title", content: "Insights & Blog — Pravin Elite Fitness" },
      {
        property: "og:description",
        content:
          "Coach Pravin's playbook: Indian diet, fat loss, PCOS, strength, and the science behind real transformations.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const posts = [
  {
    cat: "Nutrition",
    title: "The Indian Plate, Re-Engineered for Fat Loss",
    excerpt:
      "Why dal-chawal isn't your enemy — and how to build a protein-first thali that keeps you full and lean.",
    read: "6 min",
    slug: "indian-plate-fat-loss",
  },
  {
    cat: "PCOS",
    title: "PCOS Fat Loss: The Protocol That Actually Works",
    excerpt:
      "Insulin resistance, training timing, and the three food swaps that have helped 200+ Pune women break the plateau.",
    read: "8 min",
    slug: "pcos-fat-loss-protocol",
  },
  {
    cat: "Strength",
    title: "Strength Training After 35 — A Pune Guide",
    excerpt:
      "Joints, recovery, and the 4-day split that keeps working professionals strong, mobile, and pain-free.",
    read: "7 min",
    slug: "strength-after-35",
  },
  {
    cat: "Mindset",
    title: "Why Most Transformations Fail at Week 6",
    excerpt:
      "The motivation cliff is real. Here's the accountability system that gets clients past it — every time.",
    read: "5 min",
    slug: "week-six-cliff",
  },
  {
    cat: "Diabetes",
    title: "Type 2 Diabetes: Reverse It With Food + Training",
    excerpt:
      "What the research says, what we do with clients, and the simple weekly structure that drops HbA1c.",
    read: "9 min",
    slug: "type-2-reverse",
  },
  {
    cat: "Habits",
    title: "The 5 Daily Habits Every Lean Indian Has",
    excerpt:
      "Hydration, sleep, walking, protein, and the one thing nobody talks about. Steal these starting tomorrow.",
    read: "4 min",
    slug: "five-lean-habits",
  },
];

const categories = ["All", "Nutrition", "PCOS", "Strength", "Mindset", "Diabetes", "Habits"];

const categoryColors: Record<string, string> = {
  Nutrition: "border-gold/40 text-gold",
  PCOS: "border-rose-500/40 text-rose-400",
  Strength: "border-blue-500/40 text-blue-400",
  Mindset: "border-purple-500/40 text-purple-400",
  Diabetes: "border-emerald-500/40 text-emerald-400",
  Habits: "border-amber-500/40 text-amber-400",
};

function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCat === "All" || p.cat === activeCat;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCat]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <WhatsAppFab />
      <ScrollToTop />

      <HeroSection
        eyebrow="Insights"
        title={
          <>
            The <span className="text-gradient-gold">Playbook</span>
          </>
        }
        description="Field notes from 1,500+ transformations. Indian food, Indian schedules, Indian science."
      />

      <Section>
        {/* Search & Filter */}
        <div className="mb-10 space-y-4">
          {/* Search */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-gold"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCat === cat
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-xs text-muted-foreground">
          Showing {filtered.length} of {posts.length} articles
        </p>

        {/* Articles grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <article className="group flex h-full flex-col rounded-3xl border border-border bg-card/60 p-8 transition-all hover:border-gold/60 hover:shadow-gold">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                    <span
                      className={`rounded-full border px-3 py-1 font-semibold ${
                        categoryColors[p.cat] || "border-gold/40 text-gold"
                      }`}
                    >
                      {p.cat}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {p.read}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl leading-tight tracking-wide transition-colors group-hover:text-gold md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <Link
                    to="/blog"
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold transition-all hover:text-gold-light group/link"
                  >
                    Read article{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No articles found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCat("All");
                }}
                className="mt-4 text-sm font-semibold text-gold hover:text-gold-light"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-gold/30 bg-card/40 p-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">
              Want the full playbook delivered to your phone?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Book a free 30-minute consult (we'll send you a personalised starter plan over
              WhatsApp).
            </p>
            <Link
              to="/booking"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-semibold text-background shadow-gold transition-transform hover:scale-105"
            >
              Book Free Consult <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </div>
  );
}
