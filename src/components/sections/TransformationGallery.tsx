import { motion } from "framer-motion";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { TrendingDown, Flame, Heart, Trophy } from "lucide-react";

const cards = [
  {
    icon: TrendingDown,
    weeks: "12 WEEKS",
    headline: "−30 kg",
    name: "Sameer K.",
    detail: "Baner · 38 · IT Manager",
    note: "Reversed pre-diabetes. Off all medication.",
  },
  {
    icon: Heart,
    weeks: "20 WEEKS",
    headline: "−18 kg",
    name: "Priya S.",
    detail: "Aundh · 32 · PCOS",
    note: "Cycles regular. Energy back. Confidence restored.",
  },
  {
    icon: Flame,
    weeks: "16 WEEKS",
    headline: "+8 kg muscle",
    name: "Rishikesh J.",
    detail: "Kothrud · 41 · Architect",
    note: "Back pain gone. Stronger than at 25.",
  },
  {
    icon: Trophy,
    weeks: "10 WEEKS",
    headline: "−12 kg",
    name: "Anjali M.",
    detail: "Wakad · 29 · Mother of 2",
    note: "Postpartum recovery without crash dieting.",
  },
];

export function TransformationGallery() {
  return (
    <Section className="bg-card/30">
      <Reveal>
        <div className="text-center">
          <Eyebrow>Transformations</Eyebrow>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">
            Bodies <span className="text-gradient-gold">Rebuilt</span> in Pune
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real clients. Real numbers. Real Indian food. No filters, no fads.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:border-gold/60 hover:shadow-gold"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-gold opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-gold/30 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-gold">
                    {c.weeks}
                  </span>
                </div>
                <div className="mt-8 font-display text-5xl text-gradient-gold">{c.headline}</div>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.detail}
                  </div>
                  <p className="mt-3 font-serif text-sm italic text-muted-foreground">"{c.note}"</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
