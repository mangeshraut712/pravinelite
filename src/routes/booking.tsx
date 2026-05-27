import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2, MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Free Consultation — Pravin Elite Fitness Pune" },
      {
        name: "description",
        content:
          "Schedule a 30-minute free consultation with Pune's top personal trainer. Pick a date & time online. Confirmation on WhatsApp within the hour.",
      },
      { property: "og:title", content: "Book Your Free Consultation — Pravin Elite Fitness" },
      {
        property: "og:description",
        content: "Pick a slot. Get confirmed. Start your transformation.",
      },
    ],
  }),
  component: BookingPage,
});

const TIME_SLOTS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "10:00 AM",
  "11:00 AM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const GOALS = [
  { v: "fat-loss", l: "Fat Loss" },
  { v: "muscle-gain", l: "Muscle Gain" },
  { v: "pcos", l: "PCOS / PCOD" },
  { v: "diabetes", l: "Diabetes Management" },
  { v: "injury-recovery", l: "Injury Recovery" },
  { v: "senior", l: "Senior Fitness" },
  { v: "general", l: "General Fitness" },
] as const;

const MODES = [
  { v: "in-gym", l: "In-Gym (Pune)" },
  { v: "at-home", l: "At-Home (Pune)" },
  { v: "online", l: "Online (Anywhere)" },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Use digits only"),
  email: z.string().trim().email("Invalid email").max(254).optional().or(z.literal("")),
  goal: z.enum([
    "fat-loss",
    "muscle-gain",
    "pcos",
    "diabetes",
    "injury-recovery",
    "senior",
    "general",
  ]),
  mode: z.enum(["in-gym", "at-home", "online"]),
  notes: z.string().max(500).optional(),
});

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(() => addDays(new Date(), 1));
  const [time, setTime] = useState<string>("10:00 AM");
  const [form, setForm] = useState<{
    name: string;
    phone: string;
    email: string;
    goal: (typeof GOALS)[number]["v"];
    mode: (typeof MODES)[number]["v"];
    notes: string;
  }>({
    name: "",
    phone: "",
    email: "",
    goal: "fat-loss",
    mode: "in-gym",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { id: string; date: Date; time: string }>(null);
  const [err, setErr] = useState<string | null>(null);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const whatsAppHref = useMemo(() => {
    if (!confirmed) return "";
    const msg = `Hi Pravin! I just booked a consultation:

Name: ${form.name}
Phone: ${form.phone}
Goal: ${GOALS.find((g) => g.v === form.goal)?.l}
Mode: ${MODES.find((m) => m.v === form.mode)?.l}
Slot: ${format(confirmed.date, "EEEE, d MMM yyyy")} · ${confirmed.time}

Please confirm. Thank you!`;
    return `https://wa.me/9175200391?text=${encodeURIComponent(msg)}`;
  }, [confirmed, form]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!date) {
      setErr("Please pick a date for your consultation.");
      return;
    }
    const parsed = schema.safeParse({ ...form, email: form.email || undefined });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        goal: parsed.data.goal,
        mode: parsed.data.mode,
        slot_date: format(date, "yyyy-MM-dd"),
        slot_time: time,
        notes: parsed.data.notes || null,
        status: "pending",
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (error || !data) {
      if (error) console.warn("Booking insert failed", error);
      setErr("Could not save your booking. Please try again or WhatsApp Pravin directly.");
      return;
    }

    setConfirmed({ id: data.id, date, time });
    requestAnimationFrame(() => {
      document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <WhatsAppFab />
      <ScrollToTop />

      <HeroSection
        eyebrow="Free 30-Min Consultation"
        title={
          <>
            Book Your <span className="text-gradient-gold">Slot.</span>
          </>
        }
        description="Pick a date and time. Confirmation on WhatsApp within the hour. Zero obligation."
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["📅 No credit card", "⚡ Reply within 1 hour", "🔄 Reschedule anytime"].map((f) => (
            <span
              key={f}
              className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </HeroSection>

      <Section>
        <div className="mx-auto max-w-5xl">
          {!confirmed ? (
            <Reveal>
              <form
                onSubmit={submit}
                className="grid gap-8 rounded-3xl border border-border bg-card/60 p-6 shadow-card-elevated md:p-10 lg:grid-cols-[1.2fr_1fr]"
              >
                {/* LEFT: slot picker */}
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                      <CalendarIcon className="h-3.5 w-3.5" /> Pick a Date
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-3 text-left transition-colors hover:border-gold",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <span>{date ? format(date, "EEEE, d MMMM yyyy") : "Pick a date"}</span>
                          <CalendarIcon className="h-4 w-4 text-gold" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => isBefore(d, today) || isBefore(maxDate, d)}
                          className={cn("pointer-events-auto p-3")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                      <Clock className="h-3.5 w-3.5" /> Pick a Time (IST)
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={cn(
                            "rounded-xl border px-3 py-2.5 text-sm transition-all",
                            time === t
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border bg-background text-muted-foreground hover:border-gold/40",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm">
                    <div className="font-semibold text-gold">
                      {date ? format(date, "EEE, d MMM") : "—"} · {time}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      You'll get a confirmation on WhatsApp & email. Reschedule any time.
                    </p>
                  </div>
                </div>

                {/* RIGHT: details */}
                <div className="space-y-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                    <MapPin className="h-3.5 w-3.5" /> Your Details
                  </div>

                  <input
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    maxLength={100}
                    aria-label="Your full name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                  <input
                    placeholder="Phone (+91 92724 32562)"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    maxLength={20}
                    aria-label="Your phone number"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                  <input
                    placeholder="Email (optional)"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={254}
                    aria-label="Your email address"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />

                  <select
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value as typeof form.goal })}
                    aria-label="Your fitness goal"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  >
                    {GOALS.map((g) => (
                      <option key={g.v} value={g.v}>
                        Goal: {g.l}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-3 gap-2">
                    {MODES.map((m) => (
                      <button
                        type="button"
                        key={m.v}
                        onClick={() => setForm({ ...form, mode: m.v })}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-xs transition-all",
                          form.mode === m.v
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border bg-background text-muted-foreground hover:border-gold/40",
                        )}
                      >
                        {m.l}
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder="Anything Pravin should know? (optional)"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    maxLength={500}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />

                  {err && (
                    <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm">
                      {err}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 font-semibold text-background shadow-gold transition-transform hover:scale-[1.01] disabled:opacity-60"
                  >
                    {submitting ? "Booking…" : "Confirm My Slot"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    By booking you agree to be contacted on WhatsApp/phone.
                  </p>
                </div>
              </form>
            </Reveal>
          ) : (
            <AnimatePresence>
              <motion.div
                id="confirmation"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-gold bg-card p-10 text-center shadow-gold"
              >
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-background">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 font-display text-5xl md:text-6xl">
                    Slot <span className="text-gradient-gold">Locked.</span>
                  </h2>
                  <p className="mt-3 text-lg text-muted-foreground">
                    See you on{" "}
                    <span className="font-semibold text-foreground">
                      {format(confirmed.date, "EEEE, d MMMM")} at {confirmed.time}
                    </span>
                    .
                  </p>

                  <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-background/60 p-5 text-left text-sm">
                    <Row k="Name" v={form.name} />
                    <Row k="Phone" v={form.phone} />
                    {form.email && <Row k="Email" v={form.email} />}
                    <Row k="Goal" v={GOALS.find((g) => g.v === form.goal)?.l ?? ""} />
                    <Row k="Mode" v={MODES.find((m) => m.v === form.mode)?.l ?? ""} />
                    <Row k="Booking ID" v={confirmed.id.slice(0, 8).toUpperCase()} />
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <MessageCircle className="h-5 w-5" /> Confirm on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmed(null);
                        setForm({
                          name: "",
                          phone: "",
                          email: "",
                          goal: "fat-loss",
                          mode: "in-gym",
                          notes: "",
                        });
                      }}
                      className="rounded-full border border-border px-6 py-3 text-sm hover:border-gold hover:text-gold"
                    >
                      Book Another
                    </button>
                  </div>

                  <p className="mt-6 text-xs text-muted-foreground">
                    Tap "Confirm on WhatsApp" so Pravin can lock the slot in his calendar.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
