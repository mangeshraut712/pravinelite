import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Target, TrendingUp, ArrowRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import calculatorHero from "@/assets/calculator-hero.jpg";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "BMI & Calorie Calculator — Pravin Elite Fitness Pune" },
      {
        name: "description",
        content:
          "Free India-specific BMI, TDEE & calorie calculator. Get an instant personalized program recommendation from Pune's top personal trainer.",
      },
      { property: "og:title", content: "Free BMI + Calorie Calculator — Indian Standards" },
      {
        property: "og:description",
        content: "Calculate your BMI & daily calories. Get a custom program in 30 seconds.",
      },
    ],
  }),
  component: CalculatorPage,
});

const schema = z.object({
  age: z.coerce.number().int().min(10).max(100),
  gender: z.enum(["male", "female", "other"]),
  height: z.coerce.number().min(100).max(250),
  weight: z.coerce.number().min(25).max(300),
  activity: z.enum(["sedentary", "light", "moderate", "active", "very-active"]),
  goal: z.enum(["fat-loss", "muscle-gain", "general", "pcos", "diabetes"]),
});

type FormData = z.infer<typeof schema>;

const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
} as const;

const ACTIVITY_LABELS = {
  sedentary: "Sedentary · Desk job, no exercise",
  light: "Light · 1–3 days/week",
  moderate: "Moderate · 3–5 days/week",
  active: "Active · 6–7 days/week",
  "very-active": "Very Active · 2x/day or physical job",
} as const;

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-sky-400", tone: "underweight" };
  if (bmi < 23) return { label: "Healthy (Asian)", color: "text-green-400", tone: "healthy" };
  if (bmi < 25) return { label: "Overweight (Asian)", color: "text-amber-400", tone: "overweight" };
  if (bmi < 30) return { label: "Obese Class I", color: "text-orange-400", tone: "obese1" };
  return { label: "Obese Class II", color: "text-red-400", tone: "obese2" };
}

function recommendProgram(bmi: number, goal: FormData["goal"]) {
  if (goal === "pcos" || goal === "diabetes") {
    return {
      name: "90-Day Elite",
      price: "₹26,999",
      reason:
        "Your condition needs sustained, monitored coaching with monthly assessments and Indian-diet meal planning.",
      link: "/programs",
    };
  }
  if (goal === "muscle-gain") {
    return {
      name: "90-Day Elite",
      price: "₹26,999",
      reason:
        "Quality muscle gain needs 12+ weeks of progressive training and a precise surplus diet.",
      link: "/programs",
    };
  }
  if (bmi >= 30) {
    return {
      name: "90-Day Elite",
      price: "₹26,999",
      reason:
        "BMI ≥ 30 needs a 90-day medically-aware fat-loss protocol with weekly accountability.",
      link: "/programs",
    };
  }
  if (bmi >= 25) {
    return {
      name: "45-Day Challenge",
      price: "₹14,999",
      reason:
        "You can drop into a healthy range in 6 weeks with the structured 45-day fat-loss system.",
      link: "/programs",
    };
  }
  if (bmi < 18.5) {
    return {
      name: "Nutrition Only",
      price: "₹4,999/mo",
      reason:
        "You need targeted Indian-food nutrition coaching to build healthy weight before heavy training.",
      link: "/programs",
    };
  }
  return {
    name: "Nutrition Only",
    price: "₹4,999/mo",
    reason:
      "You're in a healthy range. A nutrition plan will sharpen body composition without overhauling life.",
    link: "/programs",
  };
}

function getMacros(tdee: number, goal: FormData["goal"], weight: number) {
  let calories = tdee;
  if (goal === "fat-loss" || goal === "pcos" || goal === "diabetes")
    calories = Math.round(tdee - 500);
  else if (goal === "muscle-gain") calories = Math.round(tdee + 300);
  const protein = Math.round(weight * (goal === "muscle-gain" ? 2.0 : 1.8));
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
  return { calories, protein, fats, carbs };
}

function CalculatorPage() {
  const [form, setForm] = useState<Partial<FormData>>({
    age: undefined,
    gender: "male",
    height: undefined,
    weight: undefined,
    activity: "moderate",
    goal: "fat-loss",
  });
  const [result, setResult] = useState<null | {
    bmi: number;
    bmiCat: ReturnType<typeof getBmiCategory>;
    tdee: number;
    bmr: number;
    macros: ReturnType<typeof getMacros>;
    program: ReturnType<typeof recommendProgram>;
    data: FormData;
  }>(null);
  const [err, setErr] = useState<string | null>(null);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please fill all fields correctly.");
      return;
    }
    const d = parsed.data;
    const heightM = d.height / 100;
    const bmi = +(d.weight / (heightM * heightM)).toFixed(1);
    const bmr =
      d.gender === "male"
        ? 10 * d.weight + 6.25 * d.height - 5 * d.age + 5
        : 10 * d.weight + 6.25 * d.height - 5 * d.age - 161;
    const tdee = Math.round(bmr * ACTIVITY_FACTORS[d.activity]);
    const macros = getMacros(tdee, d.goal, d.weight);
    const bmiCat = getBmiCategory(bmi);
    const program = recommendProgram(bmi, d.goal);
    setResult({ bmi, bmiCat, tdee, bmr: Math.round(bmr), macros, program, data: d });
    supabase
      .from("calculator_leads")
      .insert({
        age: d.age,
        gender: d.gender,
        height_cm: d.height,
        weight_kg: d.weight,
        activity: d.activity,
        goal: d.goal,
        bmi,
        tdee,
        recommended_program: program.name,
      })
      .then(({ error }) => {
        if (error) console.warn("Lead capture failed", error.message);
      });
    requestAnimationFrame(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function reset() {
    setResult(null);
    setErr(null);
    document.getElementById("calc-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <WhatsAppFab />
      <ScrollToTop />
      <HeroSection
        eyebrow="Smart Calculator · India-Specific"
        title={
          <>
            <span className="sr-only">Free BMI and Calorie Calculator for Indian Body Types: </span>
            Know Your <span className="text-gradient-gold">Numbers.</span>
            <br />
            Know Your <span className="text-gradient-gold">Plan.</span>
          </>
        }
        description="BMI · BMR · TDEE · Macro split: calibrated for Indian body types & food. Get a personalized program in 30 seconds."
        image={{ src: calculatorHero, alt: "Fitness calculator" }}
      />
      <Section id="calc-form">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <form
              onSubmit={calculate}
              className="rounded-3xl border border-border bg-card/60 p-6 shadow-card-elevated md:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Activity className="h-5 w-5" />
                </div>
                <h2 className="font-display text-3xl tracking-wide">Your Stats</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Age">
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={form.age ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, age: e.target.value ? +e.target.value : undefined })
                    }
                    placeholder="28"
                    aria-label="Your age"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
                    required
                  />
                </Field>
                <Field label="Gender">
                  <div
                    className="grid grid-cols-3 gap-2"
                    role="radiogroup"
                    aria-label="Select your gender"
                  >
                    {(["male", "female", "other"] as const).map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setForm({ ...form, gender: g })}
                        className={`rounded-xl border px-3 py-3 text-sm capitalize transition-all ${form.gender === g ? "border-gold bg-gold/10 text-gold" : "border-border bg-background text-muted-foreground hover:border-gold/40"}`}
                        aria-label={`Gender: ${g}`}
                        aria-pressed={form.gender === g}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Height (cm)">
                  <input
                    type="number"
                    min={100}
                    max={250}
                    value={form.height ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, height: e.target.value ? +e.target.value : undefined })
                    }
                    placeholder="170"
                    aria-label="Your height in centimeters"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-gold"
                    required
                  />
                </Field>
                <Field label="Weight (kg)">
                  <input
                    type="number"
                    min={25}
                    max={300}
                    step={0.1}
                    value={form.weight ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value ? +e.target.value : undefined })
                    }
                    placeholder="75"
                    aria-label="Your weight in kilograms"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-gold"
                    required
                  />
                </Field>
                <Field label="Activity Level" full>
                  <select
                    value={form.activity}
                    onChange={(e) =>
                      setForm({ ...form, activity: e.target.value as FormData["activity"] })
                    }
                    aria-label="Select your activity level"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-gold"
                  >
                    {Object.entries(ACTIVITY_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Primary Goal" full>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {(
                      [
                        ["fat-loss", "Fat Loss"],
                        ["muscle-gain", "Muscle Gain"],
                        ["general", "General Fitness"],
                        ["pcos", "PCOS/PCOD"],
                        ["diabetes", "Diabetes"],
                      ] as const
                    ).map(([v, label]) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setForm({ ...form, goal: v })}
                        className={`rounded-xl border px-3 py-2.5 text-sm transition-all ${form.goal === v ? "border-gold bg-gold/10 text-gold" : "border-border bg-background text-muted-foreground hover:border-gold/40"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              {err && (
                <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
                  {err}
                </p>
              )}
              <button
                type="submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 font-semibold text-background shadow-gold transition-all hover:scale-[1.01]"
              >
                <Flame className="h-5 w-5" /> Calculate My Plan{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
          <AnimatePresence>
            {result && (
              <motion.div
                id="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10 space-y-6"
              >
                <div className="rounded-3xl border border-gold/40 bg-gradient-card p-8 text-center shadow-gold">
                  <Eyebrow>Your Body, Today</Eyebrow>
                  <div className="mt-2 font-display text-7xl text-gradient-gold md:text-8xl">
                    {result.bmi}
                  </div>
                  <div
                    className={`mt-2 font-semibold uppercase tracking-wider ${result.bmiCat.color}`}
                  >
                    BMI · {result.bmiCat.label}
                  </div>
                  <div className="relative mx-auto mt-6 h-3 max-w-md overflow-hidden rounded-full bg-secondary">
                    <div className="absolute inset-y-0 left-0 w-[23%] bg-sky-500/60" />
                    <div className="absolute inset-y-0 left-[23%] w-[10%] bg-green-500/70" />
                    <div className="absolute inset-y-0 left-[33%] w-[12%] bg-amber-500/70" />
                    <div className="absolute inset-y-0 left-[45%] w-[25%] bg-orange-500/70" />
                    <div className="absolute inset-y-0 left-[70%] w-[30%] bg-red-500/70" />
                    <motion.div
                      className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-foreground shadow-lg"
                      initial={{ left: "0%" }}
                      animate={{ left: `${Math.min(100, (result.bmi / 40) * 100)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mx-auto mt-2 flex max-w-md justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>0</span>
                    <span>18.5</span>
                    <span>23</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <Stat
                    label="Daily Calories"
                    value={`${result.macros.calories}`}
                    unit="kcal"
                    icon={Flame}
                  />
                  <Stat label="Protein" value={`${result.macros.protein}`} unit="g" />
                  <Stat label="Carbs" value={`${result.macros.carbs}`} unit="g" />
                  <Stat label="Fats" value={`${result.macros.fats}`} unit="g" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Stat
                    label="BMR (Resting Burn)"
                    value={`${result.bmr}`}
                    unit="kcal"
                    icon={TrendingUp}
                  />
                  <Stat
                    label="TDEE (Daily Burn)"
                    value={`${result.tdee}`}
                    unit="kcal"
                    icon={Activity}
                  />
                </div>
                <div className="relative overflow-hidden rounded-3xl border border-gold bg-card p-8 shadow-gold md:p-10">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      <Target className="h-4 w-4" /> Pravin's Recommendation
                    </div>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">
                      {result.program.name}
                    </h3>
                    <div className="mt-2 font-display text-3xl text-gradient-gold">
                      {result.program.price}
                    </div>
                    <p className="mt-4 max-w-xl text-muted-foreground">{result.program.reason}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-semibold text-background shadow-gold transition-all hover:scale-105"
                      >
                        Book a Free Consultation <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={`https://wa.me/9175200391?text=${encodeURIComponent(`Hi Pravin! My BMI is ${result.bmi} (${result.bmiCat.label}). I'm interested in the ${result.program.name}. Can we chat?`)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 font-semibold hover:border-gold hover:text-gold"
                      >
                        <MessageCircle className="h-4 w-4" /> Discuss on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Recalculate
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Calculations use the Mifflin–St Jeor formula and WHO Asian BMI thresholds. For
                  medical conditions consult your physician before starting any program.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
      <Footer />
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({
  label,
  value,
  unit,
  icon: Icon,
}: {
  label: string;
  value: string;
  unit: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 text-gold" />} {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-4xl text-gradient-gold">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
