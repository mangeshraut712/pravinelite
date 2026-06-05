import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
import { z } from "zod";

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
          "WhatsApp, call, or message Pune's premier personal trainer. Free 30-minute consultation, reply within an hour.",
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
    href: "https://wa.me/919272432562",
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

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Use digits only"),
  email: z.string().trim().email("Invalid email").max(254).optional().or(z.literal("")),
  goal: z.string().min(1, "Please select a goal"),
  mode: z.string().min(1, "Please select a training mode"),
  notes: z.string().max(500).optional(),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
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
                    setFieldErrors({});

                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") as string;
                    const phone = formData.get("phone") as string;
                    const email = formData.get("email") as string;
                    const goal = formData.get("goal") as string;
                    const mode = formData.get("mode") as string;
                    const notes = formData.get("notes") as string;

                    const parsed = contactSchema.safeParse({
                      name,
                      phone,
                      email: email || undefined,
                      goal,
                      mode,
                      notes: notes || undefined,
                    });

                    if (!parsed.success) {
                      setFieldErrors(parsed.error.flatten().fieldErrors);
                      return;
                    }

                    setSubmitted(true);

                    const msg = `Hi Pravin! I'd like to get in touch:

Name: ${parsed.data.name}
Phone: ${parsed.data.phone}
${parsed.data.email ? `Email: ${parsed.data.email}\n` : ""}Goal: ${parsed.data.goal}
Mode: ${parsed.data.mode}
${parsed.data.notes ? `Message: ${parsed.data.notes}` : ""}`;

                    window.open(
                      `https://wa.me/919272432562?text=${encodeURIComponent(msg)}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        required
                        name="name"
                        aria-label="Your name"
                        placeholder="Your Name"
                        aria-invalid={fieldErrors.name ? "true" : "false"}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      />
                      {fieldErrors.name?.[0] && (
                        <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">
                          {fieldErrors.name[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        required
                        name="phone"
                        type="tel"
                        aria-label="Phone number"
                        placeholder="Phone (+91)"
                        aria-invalid={fieldErrors.phone ? "true" : "false"}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      />
                      {fieldErrors.phone?.[0] && (
                        <p id="phone-error" role="alert" className="mt-1 text-xs text-destructive">
                          {fieldErrors.phone[0]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      aria-label="Email address"
                      placeholder="Email (optional)"
                      aria-invalid={fieldErrors.email ? "true" : "false"}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                    {fieldErrors.email?.[0] && (
                      <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                        {fieldErrors.email[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      name="goal"
                      aria-label="Your fitness goal"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <option value="Fat Loss">My Goal: Fat Loss</option>
                      <option value="Muscle Gain">My Goal: Muscle Gain</option>
                      <option value="PCOS / PCOD">My Goal: PCOS / PCOD</option>
                      <option value="Diabetes Management">My Goal: Diabetes Management</option>
                      <option value="General Fitness">My Goal: General Fitness</option>
                    </select>
                    <select
                      name="mode"
                      aria-label="Preferred training mode"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <option value="In-Gym">Mode: In-Gym</option>
                      <option value="At-Home">Mode: At-Home</option>
                      <option value="Online">Mode: Online</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="notes"
                      rows={4}
                      aria-label="Message about your goals"
                      placeholder="Tell me about your goals, medical conditions, or anything else I should know (optional)"
                      aria-invalid={fieldErrors.notes ? "true" : "false"}
                      aria-describedby={fieldErrors.notes ? "notes-error" : undefined}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                    {fieldErrors.notes?.[0] && (
                      <p id="notes-error" role="alert" className="mt-1 text-xs text-destructive">
                        {fieldErrors.notes[0]}
                      </p>
                    )}
                  </div>
                  <button className="group w-full rounded-full bg-gradient-gold px-6 py-3.5 font-semibold text-background shadow-gold transition-all hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background">
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
