import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { CheckCircle2, Flame, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Pricing — Pravin Elite Fitness Pune" },
      {
        name: "description",
        content:
          "45-Day Challenge, 90-Day Elite, and Nutrition-only programs. Transparent pricing in INR with UPI, EMI, and Razorpay.",
      },
      { property: "og:title", content: "Programs & Pricing — Pravin Elite Fitness Pune" },
      {
        property: "og:description",
        content:
          "Transparent INR pricing for 45-Day, 90-Day Elite, and Nutrition coaching. UPI, EMI, and Razorpay accepted.",
      },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "https://pravinelitefit.com/programs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "45-Day Challenge",
              provider: { "@type": "LocalBusiness", name: "Pravin Elite Fitness" },
              description:
                "45-day personal training with custom workout plan, Indian diet, and 1:1 WhatsApp support.",
              offers: { "@type": "Offer", price: "14999", priceCurrency: "INR" },
            },
            {
              "@type": "Service",
              name: "90-Day Elite",
              provider: { "@type": "LocalBusiness", name: "Pravin Elite Fitness" },
              description:
                "90-day elite coaching with monthly assessments, supplement guidance, and lifetime alumni access.",
              offers: { "@type": "Offer", price: "26999", priceCurrency: "INR" },
            },
            {
              "@type": "Service",
              name: "Nutrition Only",
              provider: { "@type": "LocalBusiness", name: "Pravin Elite Fitness" },
              description: "Monthly customized Indian nutrition plan with weekly adjustments.",
              offers: { "@type": "Offer", price: "4999", priceCurrency: "INR" },
            },
          ],
        }),
      },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    name: "45-Day Challenge",
    tag: "STARTER",
    price: "₹14,999",
    period: "for 45 days",
    savings: "₹333/day",
    icon: Zap,
    features: [
      "Custom workout plan",
      "Indian diet meal plan",
      "WhatsApp daily check-in",
      "Weekly video consultation",
      "Body composition analysis",
      "1:1 personal support",
      "Progress tracking app",
      "Completion certificate",
    ],
    featured: false,
  },
  {
    name: "90-Day Elite",
    tag: "MOST POPULAR",
    price: "₹26,999",
    period: "for 90 days",
    savings: "₹300/day",
    icon: Flame,
    features: [
      "Everything in 45-Day",
      "Monthly body assessment",
      "Blood work guidance",
      "Indian supplement advice",
      "Custom recipe book",
      "Lifetime alumni community",
      "Priority WhatsApp support",
      "Re-test & re-plan every 30 days",
    ],
    featured: true,
  },
  {
    name: "Nutrition Only",
    tag: "FLEXIBLE",
    price: "₹4,999",
    period: "per month",
    savings: "₹165/day",
    icon: TrendingUp,
    features: [
      "Customized Indian meal plan",
      "Veg / Non-veg / Jain options",
      "Weekly diet adjustments",
      "WhatsApp support",
      "Recipe library access",
      "Festival diet tips",
      "Grocery list generator",
      "Cancel anytime",
    ],
    featured: false,
  },
];

function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollToTop />

      <HeroSection
        eyebrow="Programs"
        title={
          <>
            Transparent <span className="text-gradient-gold">Pricing</span>
          </>
        }
        description="No hidden fees. No surprise upsells. Just real coaching at honest Indian prices."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative h-full rounded-3xl border p-8 transition-all ${
                  p.featured
                    ? "border-gold bg-card shadow-gold scale-[1.02]"
                    : "border-border bg-card/60 hover:border-gold/40"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-background">
                    {p.tag}
                  </div>
                )}
                {!p.featured && (
                  <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {p.tag}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      p.featured ? "bg-gold/15 text-gold" : "bg-gold/10 text-gold"
                    }`}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-3xl tracking-wide">{p.name}</h2>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-gradient-gold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <div className="mt-1 text-xs text-gold/70">{p.savings}</div>

                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`mt-8 block rounded-full px-6 py-3 text-center font-semibold transition-all hover:scale-105 ${
                    p.featured
                      ? "bg-gradient-gold text-background shadow-gold"
                      : "border border-border text-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  Enroll Now — {p.price}
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-3xl border border-border bg-card/40 p-8 text-center">
            <h2 className="font-display text-2xl tracking-wide">Payment Options</h2>
            <p className="mt-3 text-muted-foreground">
              💳 UPI · GPay · PhonePe · Paytm · Razorpay · Visa · Mastercard · Net Banking · No-cost
              EMI on ₹3,000+
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              All prices inclusive of GST · 100% Satisfaction Guarantee · Pay securely via Razorpay
            </p>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </div>
  );
}
