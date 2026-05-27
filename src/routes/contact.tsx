import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  ArrowRight,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Pravin Elite Fitness — Book a Free Consultation in Pune" },
      {
        name: "description",
        content:
          "Book a free 30-minute consultation with Pravin Elite Fitness in Pune. WhatsApp, call, or fill the form (usually replies within an hour).",
      },
      {
        property: "og:title",
        content: "Contact Pravin Elite Fitness — Book a Free Consultation in Pune",
      },
      {
        property: "og:description",
        content:
          "WhatsApp, call, or message Pune's #1 personal trainer. Free 30-minute consultation, reply within an hour.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp (Fastest)",
    value: "+91 92724 32562",
    href: "https://wa.me/9175200391",
    color: "bg-[#25D366]/15 text-[#25D366]",
    hover: "hover:border-[#25D366] hover:shadow-[#25D366]/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 92724 32562",
    href: "tel:+919272432562",
    color: "bg-gold/10 text-gold",
    hover: "hover:border-gold",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Pravinelitefitness@gmail.com",
    href: "mailto:Pravinelitefitness@gmail.com",
    color: "bg-gold/10 text-gold",
    hover: "hover:border-gold",
  },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <WhatsAppFab />
      <ScrollToTop />

      <HeroSection
        eyebrow="Get in Touch"
        title={
          <>
            Let's Start Your <span className="text-gradient-gold">Journey</span>
          </>
        }
        description="Free 30-minute consultation. Usually replies within an hour."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-card-elevated">
              <div className="flex items-center gap-3 mb-2">
                <Send className="h-5 w-5 text-gold" />
                <h2 className="font-display text-3xl tracking-wide">Send a Message</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Fill this form and Pravin will reply on WhatsApp within an hour.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-gold/40 bg-gold/10 p-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-background">
                    <Send className="h-8 w-8" />
                  </div>
                  <p className="mt-4 text-xl font-semibold">Message received! 🎉</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pravin will WhatsApp you within an hour. Keep an eye on your phone!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-gold hover:text-gold-light"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      aria-label="Your name"
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                    />
                    <input
                      required
                      type="tel"
                      aria-label="Phone number"
                      placeholder="Phone (+91)"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                    />
                  </div>
                  <input
                    type="email"
                    aria-label="Email address"
                    placeholder="Email (optional)"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      aria-label="Your fitness goal"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                    >
                      <option>My Goal: Fat Loss</option>
                      <option>My Goal: Muscle Gain</option>
                      <option>My Goal: PCOS / PCOD</option>
                      <option>My Goal: Diabetes Management</option>
                      <option>My Goal: General Fitness</option>
                    </select>
                    <select
                      aria-label="Preferred training mode"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                    >
                      <option>Mode: In-Gym</option>
                      <option>Mode: At-Home</option>
                      <option>Mode: Online</option>
                    </select>
                  </div>
                  <textarea
                    rows={4}
                    aria-label="Message about your goals"
                    placeholder="Tell me about your goals, medical conditions, or anything else I should know (optional)"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                  <button className="group w-full rounded-full bg-gradient-gold px-6 py-3.5 font-semibold text-background shadow-gold transition-all hover:scale-[1.02] hover:shadow-lg">
                    <span className="flex items-center justify-center gap-2">
                      Start My Journey
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-6 transition-all ${method.hover} hover:shadow-lg`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.color}`}
                  >
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {method.label}
                    </div>
                    <div className="font-semibold truncate">{method.value}</div>
                  </div>
                </a>
              ))}

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Service Area
                  </div>
                  <div className="font-semibold">Pune, Maharashtra (+ Online India-wide)</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Hours
                  </div>
                  <div className="font-semibold">Mon–Sat · 6 AM – 9 PM IST</div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/pravinelitefitness_india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 p-4 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />{" "}
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@PravinEliteFitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 p-4 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <Youtube className="h-5 w-5 transition-transform group-hover:scale-110" /> YouTube
                </a>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center">
                <Sparkles className="mx-auto mb-2 h-5 w-5 text-gold" />
                <p className="text-sm">
                  <span className="font-semibold text-gold">
                    Typical response time: {"<"} 1 hour
                  </span>
                  <br />
                  <span className="text-muted-foreground">via WhatsApp</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
