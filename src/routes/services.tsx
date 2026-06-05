import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { Dumbbell, Home, Laptop, Salad, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Pravin Elite Fitness | Pune Personal Training" },
      {
        name: "description",
        content:
          "In-Gym, At-Home, Online coaching and Indian nutrition plans by Pune's premier personal trainer.",
      },
      { property: "og:title", content: "Services — In-Gym, At-Home & Online Training in Pune" },
      {
        property: "og:description",
        content:
          "Choose In-Gym, At-Home, or Online personal training with custom Indian nutrition plans.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Dumbbell,
    title: "In-Gym Personal Training",
    desc: "Hands-on, high-intensity sessions at our partner gyms across Pune. Custom programming, real-time coaching, and measurable progress every week.",
    points: [
      "1-on-1 coaching",
      "Partner gyms in Kothrud, Aundh, Baner, Wakad",
      "Personalized progression",
      "Form correction & injury prevention",
    ],
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Home,
    title: "At-Home Personal Training",
    desc: "Pravin comes to you. No gym, no equipment, no excuses. Effective bodyweight + minimal-equipment programs designed for your space.",
    points: [
      "Trainer travels to you anywhere in Pune",
      "Bodyweight or minimal equipment",
      "Flexible scheduling",
      "Family-friendly",
    ],
    color: "bg-fire/10 text-fire",
  },
  {
    icon: Laptop,
    title: "Online Coaching",
    desc: "Train from anywhere in India. WhatsApp accountability, weekly video calls, and a custom plan that adapts to your life.",
    points: [
      "Pan-India availability",
      "WhatsApp daily check-ins",
      "Weekly video consultations",
      "Custom workout & nutrition app",
    ],
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    icon: Salad,
    title: "Indian Nutrition Plans",
    desc: "No chicken-and-broccoli templates. Real Indian food — dal, sabji, roti, rice — engineered for your goals, your region, your kitchen.",
    points: [
      "Veg, Non-Veg, Jain, Vegan",
      "Regional cuisine: Maharashtrian, South, North, Gujarati",
      "Festival diet planning",
      "Recipe library access",
    ],
    color: "bg-green-500/10 text-green-400",
  },
  {
    icon: Heart,
    title: "Specialized Health Programs",
    desc: "PCOS, diabetes, thyroid, post-injury, senior, teen, postpartum — protocols designed with medical considerations and Indian lifestyle in mind.",
    points: [
      "PCOS / PCOD fat loss protocol",
      "Type 2 Diabetes management",
      "Post-injury rehab",
      "Senior (55+) & teen fitness",
    ],
    color: "bg-rose-500/10 text-rose-400",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollToTop />

      <HeroSection
        eyebrow="Our Services"
        title={
          <>
            Your Fitness, <br />
            <span className="text-gradient-gold">Your Format.</span>
          </>
        }
        description="Five core services. One uncompromising standard. Pick the format that fits your life."
      />

      <Section>
        <div className="space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, x: 4 }}
                className="group grid gap-8 rounded-3xl border border-border bg-card/60 p-8 transition-all hover:border-gold/50 hover:shadow-gold md:grid-cols-[auto_1fr] md:p-12"
              >
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-110`}
                >
                  <s.icon className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="font-display text-3xl tracking-wide md:text-4xl">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-gold transition-all hover:text-gold-light group/link"
                  >
                    Book a Consultation{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
