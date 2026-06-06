import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import pravinImg from "@/assets/pravin-portrait.jpg";
import { Award, Users, Calendar, Target, Quote } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pravin — Pune's Premier Personal Trainer" },
      {
        name: "description",
        content:
          "Five years of coaching, 1500+ transformations. Meet Pravin and learn the philosophy behind Pravin Elite Fitness.",
      },
      { property: "og:title", content: "About Pravin — Pune's Premier Personal Trainer" },
      {
        property: "og:description",
        content:
          "Meet Pravin: 5+ years of coaching, 1500+ transformations across Pune. Real food, real training, real results.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "https://pravinelitefit.com/about" }],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Calendar, num: "5+", label: "Years" },
  { icon: Users, num: "1500+", label: "Clients" },
  { icon: Award, num: "Cert.", label: "ACSM/ISSA" },
  { icon: Target, num: "100%", label: "Custom" },
];

const specialties = [
  "Fat Loss & Toning",
  "Muscle Building",
  "PCOS / PCOD Management",
  "Diabetes Management",
  "Injury Recovery",
  "Senior Fitness",
  "Postpartum Fitness",
  "Teen Fitness",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollToTop />

      <HeroSection
        eyebrow="The Coach"
        title={
          <>
            Meet <span className="text-gradient-gold">Pravin</span>
          </>
        }
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-20 blur-2xl" />
              <img
                src={pravinImg}
                alt="Pravin — Personal Trainer in Pune"
                width={800}
                height={1024}
                loading="eager"
                className="relative h-[600px] w-full rounded-3xl border border-gold/30 object-cover shadow-card-elevated"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Eyebrow>The Story</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Real food. Real training. <span className="text-gradient-gold">Real results.</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pravin started coaching with one belief: that real change doesn't come from
                gimmicks, supplements, or Instagram trends. It comes from consistency,
                accountability, and a plan that fits your real life.
              </p>
              <p>
                Five years and over 1,500 clients later, that belief still drives every session.
                Whether it's a CEO in Baner, a homemaker in Kothrud, or a college student in
                Hinjewadi (every client gets a custom plan, Indian food they actually enjoy, and a
                coach who answers their WhatsApp).
              </p>
              <p>
                No fad diets. No 30-day miracle promises. Just sustainable, science-backed coaching
                engineered for Indian bodies, Indian schedules, and Indian kitchens.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((b) => (
                <motion.div
                  key={b.label}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border bg-card/40 p-4 text-center transition-all hover:border-gold/40"
                >
                  <b.icon className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <div className="font-display text-xl text-gradient-gold">{b.num}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {b.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Specialties */}
      <Section className="bg-card/30">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Areas of Expertise</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              What I <span className="text-gradient-gold">Specialize In</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              India-specific conditions, science-backed protocols, real results.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {specialties.map((s, i) => (
            <Reveal key={s} delay={i * 0.04}>
              <div className="rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-gold hover:bg-gold/10 hover:text-foreground">
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <Quote className="h-8 w-8 text-gold" />
            </div>
            <Eyebrow>The Philosophy</Eyebrow>
            <blockquote className="mt-6 font-serif text-3xl italic leading-relaxed md:text-4xl">
              "Fitness isn't a 90-day project. It's a lifestyle. My job is to teach you the habits,
              mindset, and knowledge to{" "}
              <span className="text-gradient-gold">never need a coach again</span>."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <span className="h-px w-8 bg-gold/40" />
              Pravin
              <span className="h-px w-8 bg-gold/40" />
            </div>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </div>
  );
}
