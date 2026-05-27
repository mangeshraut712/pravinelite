import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Home,
  Laptop,
  Salad,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Flame,
  MessageCircle,
  MapPin,
  Award,
  Users,
  Calendar,
  Target,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { TransformationGallery } from "@/components/sections/TransformationGallery";
import { FAQ } from "@/components/sections/FAQ";
import heroImg from "@/assets/hero-trainer.jpg";
import pravinImg from "@/assets/pravin-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pravin Elite Fitness — Personal Training in Pune" },
      {
        name: "description",
        content:
          "Pune's most trusted personal trainer. 1500+ transformations across In-Gym, At-Home, and Online coaching with custom Indian nutrition plans.",
      },
      { property: "og:title", content: "Pravin Elite Fitness — Personal Training in Pune" },
      {
        property: "og:description",
        content:
          "1500+ body transformations in Pune. Custom Indian diet plans. Book your free consultation today.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  {
    icon: Dumbbell,
    title: "In-Gym Training",
    desc: "Hands-on sessions at our partner gyms across Pune.",
    tag: "Kothrud · Aundh · Baner",
  },
  {
    icon: Home,
    title: "At-Home Training",
    desc: "We come to you. Anywhere in Pune. No equipment needed.",
    tag: "Pan-Pune coverage",
  },
  {
    icon: Laptop,
    title: "Online Coaching",
    desc: "Train from anywhere in India with WhatsApp + video check-ins.",
    tag: "Pan-India",
  },
  {
    icon: Salad,
    title: "Indian Nutrition",
    desc: "Real Indian food. No fad diets. Dal, sabji, roti — done right.",
    tag: "Veg · Non-Veg · Jain",
  },
];

const stats = [
  { num: "1500+", label: "Lives Transformed" },
  { num: "5+", label: "Years Coaching" },
  { num: "45", label: "Day Challenge" },
  { num: "100%", label: "Custom Plans" },
];

const conditions = [
  "PCOS / PCOD",
  "Type 2 Diabetes",
  "Thyroid Disorders",
  "Cervical Spondylosis",
  "Shoulder Injury",
  "Knee Pain",
  "Lower Back Pain",
  "Senior Fitness",
  "Teen Fitness",
  "Postpartum Recovery",
];

const programs = [
  {
    name: "45-Day Challenge",
    tag: "STARTER",
    price: "₹14,999",
    period: "for 45 days",
    features: [
      "Custom workout plan",
      "Indian diet meal plan",
      "WhatsApp daily check-in",
      "Weekly video consultation",
      "Body composition analysis",
      "1:1 personal support",
    ],
    featured: false,
  },
  {
    name: "90-Day Elite",
    tag: "MOST POPULAR",
    price: "₹26,999",
    period: "for 90 days",
    features: [
      "Everything in 45-Day, plus:",
      "Monthly body assessment",
      "Blood work guidance",
      "Indian supplement advice",
      "Custom recipe book",
      "Lifetime alumni community",
    ],
    featured: true,
  },
  {
    name: "Nutrition Only",
    tag: "FLEXIBLE",
    price: "₹4,999",
    period: "per month",
    features: [
      "Customized Indian meal plan",
      "Veg / Non-veg / Jain options",
      "Weekly diet adjustments",
      "WhatsApp support",
      "Recipe library access",
      "Festival diet tips",
    ],
    featured: false,
  },
];

const testimonials = [
  {
    name: "Sameer Kamthe",
    location: "Baner, Pune",
    text: "Pravin's training has completely changed my perspective on fitness. I saw a visible transformation in a few months. I lost 30 kgs and gained strength, stamina and better body composition. The tailored workouts and individual nutrition advice made the journey sustainable, motivating and truly life-changing.",
    achievement: "-30 kg in 90 days",
  },
  {
    name: "Rishhikesh Jadhav",
    location: "Kothrud, Pune",
    text: "I came to lose weight, but got so much more. I lost 15 kgs, my overall strength improved and most importantly I reversed the constant body pain I was living with daily. The training and guidance was bespoke and made a huge difference to my energy, mobility and confidence.",
    achievement: "Pain-free + 15kg lost",
  },
  {
    name: "Chinamyee Katre",
    location: "Aundh, Pune",
    text: "Training with Pravin was a complete lifestyle change for me. I lost weight, I found a healthier way of eating and I started feeling more energetic in my everyday life. Apart from the physical changes, I noticed an overall wellness, glowing skin and a confidence that I hadn't felt in a long time.",
    achievement: "Weight loss + wellness",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <WhatsAppFab />
      <ScrollToTop />

      {/* HERO */}
      <section className="relative grain min-h-screen overflow-hidden bg-gradient-hero pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Premium personal trainer in Pune"
            className="h-full w-full object-cover opacity-40"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <Eyebrow>Pune's #1 Personal Trainer</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-6xl leading-[0.9] tracking-tight md:text-8xl"
            >
              <span className="sr-only">Pravin Elite Fitness — Personal Training in Pune. </span>
              <span aria-hidden="true">
                TRANSFORM
                <br />
                YOUR BODY.
                <br />
                <span className="text-gradient-gold">TRANSFORM</span>
                <br />
                <span className="text-gradient-gold">YOUR LIFE.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
            >
              Expert coaching for fat loss, strength & wellness. Over{" "}
              <span className="font-semibold text-foreground">1,500 transformations</span> in Pune
              and counting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
                <span className="ml-1 font-semibold text-foreground">4.9</span>
              </span>
              <span>·</span>
              <span>1500+ Clients</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gold" /> Pune, MH
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/programs"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 font-semibold text-background shadow-gold transition-all hover:scale-105 hover:shadow-lg"
              >
                <Flame className="h-5 w-5" /> Start Your 45-Day Challenge
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/9175200391"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-8 py-4 font-semibold text-foreground backdrop-blur transition-all hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="glass relative ml-auto max-w-md rounded-3xl p-6 shadow-card-elevated"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Currently Accepting Clients
                </span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1.2, duration: 0.8 }}
                className="font-display text-7xl text-gradient-gold"
              >
                1500+
              </motion.div>
              <div className="mt-1 text-lg font-medium">Lives Changed</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Join Pune's most successful body transformation program.
              </p>
              <Link
                to="/programs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all hover:text-gold-light group/link"
              >
                <Play className="h-4 w-4" /> Watch Transformations
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <MarqueeBar />

      {/* STATS */}
      <Section className="border-y border-border">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl text-gradient-gold md:text-6xl">{s.num}</div>
                <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ABOUT */}
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
                loading="lazy"
                className="relative h-[600px] w-full rounded-3xl border border-gold/30 object-cover shadow-card-elevated"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Eyebrow>Your Coach</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Meet <span className="text-gradient-gold">Pravin</span>
              <br />
              Your Transformation Partner
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Five years of coaching. Over 1,500 transformations. Pravin built his practice around
              one belief: real results come from real food, real training, and real accountability.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Fat Loss", "Muscle Building", "PCOS", "Injury Recovery", "Senior Fitness"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-card/50 px-3 py-1 text-sm text-muted-foreground"
                  >
                    {s}
                  </span>
                ),
              )}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Award, label: "Certified" },
                { icon: Users, label: "1500+ Clients" },
                { icon: Target, label: "Goal-First" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="rounded-2xl border border-border bg-card/40 p-4 text-center transition-all hover:border-gold/40"
                >
                  <b.icon className="mx-auto mb-2 h-6 w-6 text-gold" />
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-gold transition-all hover:text-gold-light group/link"
            >
              Learn My Story{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-card/30">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Train Your Way</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Choose Your Format</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four ways to train. One uncompromising standard.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-gold/50 hover:shadow-gold"
              >
                <div className="absolute inset-0 bg-gradient-card opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl tracking-wide">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 text-xs uppercase tracking-wider text-gold">{s.tag}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section id="programs">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Programs</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Choose Your <span className="text-gradient-gold">Transformation</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Transparent Indian pricing. Real value. No hidden costs.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
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
                <h3 className="mt-3 font-display text-3xl tracking-wide">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-gradient-gold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
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
                      : "border border-border text-foreground hover:border-gold"
                  }`}
                >
                  Enroll Now
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center text-sm text-muted-foreground">
            💳 UPI · Razorpay · Cards · Net Banking · No-cost EMI on ₹3,000+ · 100% Satisfaction
            Guarantee
          </div>
        </Reveal>
      </Section>

      {/* CONDITIONS */}
      <Section className="bg-card/30">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Specialized Care</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Your Health Is Our <span className="text-gradient-fire">Priority</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              India-specific conditions, science-backed protocols.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {conditions.map((c, i) => (
            <Reveal key={c} delay={i * 0.04}>
              <div className="rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-gold hover:bg-gold/10 hover:text-foreground">
                {c}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Reveal>
          <div className="text-center">
            <Eyebrow>Real Results</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Real People. Real <span className="text-gradient-gold">Results.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl border border-border bg-card p-8 shadow-card-elevated transition-all hover:border-gold/40"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-xl text-background">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
                <div className="mt-4 inline-block rounded-full bg-fire/10 px-3 py-1 text-xs font-semibold text-fire">
                  🔥 {t.achievement}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      <TransformationGallery />

      <FAQ />

      {/* INDIA STACK */}
      <Section className="bg-card/30">
        <Reveal>
          <div className="text-center">
            <Eyebrow>🇮🇳 Built for India</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Built for <span className="text-gradient-gold">You</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🥘",
              title: "Indian Diet Plans",
              desc: "Veg, non-veg, Jain, regional cuisine — your food, your way.",
            },
            {
              icon: "💳",
              title: "UPI & Easy Payments",
              desc: "GPay, PhonePe, Paytm, EMI — pay how you want.",
            },
            {
              icon: "💬",
              title: "WhatsApp Coaching",
              desc: "Daily check-ins on the app you already use.",
            },
            {
              icon: "🗣️",
              title: "Hindi & Marathi",
              desc: "Coaching in your language. मराठी मध्ये बोलणे शक्य.",
            },
            {
              icon: "📍",
              title: "Pune Coverage",
              desc: "Kothrud · Baner · Aundh · Wakad · Hinjewadi · Kharadi.",
            },
            {
              icon: "🏥",
              title: "Doctor Coordination",
              desc: "We work with your physician for medical conditions.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-gold/40"
              >
                <div className="mb-4 text-4xl">{f.icon}</div>
                <h3 className="font-display text-xl tracking-wide">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-hero p-12 text-center md:p-20">
            <div className="absolute inset-0 bg-gradient-card opacity-50" />
            <div className="relative">
              <Calendar className="mx-auto mb-6 h-12 w-12 text-gold" />
              <h2 className="font-display text-5xl md:text-7xl">
                Your Transformation
                <br />
                <span className="text-gradient-gold">Starts Today.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Free 30-minute consultation. No commitment. Just a real conversation about your
                goals.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="rounded-full bg-gradient-gold px-8 py-4 font-semibold text-background shadow-gold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Book Free Consultation
                </Link>
                <a
                  href="https://wa.me/9175200391"
                  className="rounded-full border border-border bg-card/40 px-8 py-4 font-semibold backdrop-blur transition-all hover:border-gold hover:text-gold"
                >
                  💬 WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </div>
  );
}
