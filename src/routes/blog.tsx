import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import { HeroSection } from "@/components/ui/hero-section";
import { ArrowRight, Clock, Search, X, CheckCircle2 } from "lucide-react";

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

interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  list?: {
    items: string[];
  };
  callout?: string;
}

interface ArticleContent {
  title: string;
  subtitle: string;
  cat: string;
  read: string;
  sections: ArticleSection[];
}

const articleContents: Record<string, ArticleContent> = {
  "indian-plate-fat-loss": {
    title: "The Indian Plate, Re-Engineered for Fat Loss",
    subtitle:
      "Why dal-chawal isn't your enemy — and how to build a protein-first thali that keeps you full and lean.",
    cat: "Nutrition",
    read: "6 min",
    sections: [
      {
        heading: "The Myth of the 'Fattening' Indian Diet",
        paragraphs: [
          "Ask any gym trainer what to eat for fat loss, and they'll likely hand you a standard Western template: boiled chicken, broccoli, and egg whites. But we don't eat like that in India. For most of us, eating is a cultural experience. Sticking to a bland, imported diet is a recipe for failure because it is simply not sustainable.",
          "The truth is, traditional Indian food—roti, rice, dal, and sabji—is not inherently fattening. The problem lies in our typical portion ratios. A traditional Indian plate is heavy on carbohydrates (occupying 70-80% of the plate) and severely lacking in high-quality protein.",
        ],
      },
      {
        heading: "The Portion Problem: Re-thinking Dal",
        paragraphs: [
          "Many vegetarians view dal as their primary protein source. While dal does contain protein, it is also highly carbohydrate-dense. In fact, 100 grams of raw lentils contains roughly 60g of carbs and only 22g of protein. When cooked, a standard bowl of dal has only 5-7g of protein—the same as a single slice of bread!",
          "To transform your body, we need to re-engineer the thali. We aren't removing carbs; we are adjusting their portions to make room for protein and fiber.",
        ],
      },
      {
        heading: "The Re-Engineered Thali Formula",
        paragraphs: ["Use this simple visual formula next time you sit down for a meal:"],
        list: {
          items: [
            "50% of your plate: High-fiber vegetables (green beans, bhindi, gobhi, or a fresh cucumber/tomato salad). Fill up on these first.",
            "25% of your plate: A direct, high-quality protein source. For vegetarians: 150g paneer, 200g Greek yogurt/hung curd, or 75g (dry weight) soya chunks. For non-vegetarians: 150g grilled/curry chicken or 3-4 whole eggs.",
            "25% of your plate: Complex carbohydrates. This means 1-2 medium wheat/jowar rotis OR a small bowl of basmati/brown rice.",
          ],
        },
      },
      {
        heading: "Sample Fat Loss Day (Indian Diet)",
        paragraphs: [
          "Here is what a structured, delicious, and sustainable day of eating looks like:",
        ],
        list: {
          items: [
            "Breakfast (8:30 AM): Paneer Bhurji (150g paneer) cooked with onions, tomatoes, and green chilies + 1 slice of whole-wheat toast.",
            "Lunch (1:30 PM): 150g Chicken Breast curry (or 150g Paneer/Tofu curry for vegetarians) + 1 small bowl of dal + 1 bowl of Basmati Rice + cucumber salad.",
            "Snack (5:30 PM): A handful of roasted chana (Bengal gram) + 1 cup of green tea (no sugar).",
            "Dinner (8:30 PM): Soya Chunks Stir-fry (75g dry soya chunks boiled and sautéed with bell peppers and onions) + 1 multigrain roti.",
          ],
        },
        callout:
          "🔥 Pro Tip: Drink 500ml of water 15 minutes before your main meals. It naturally controls portion sizes and ensures you stay hydrated!",
      },
    ],
  },
  "pcos-fat-loss-protocol": {
    title: "PCOS Fat Loss: The Protocol That Actually Works",
    subtitle:
      "Insulin resistance, training timing, and the three food swaps that have helped 200+ Pune women break the plateau.",
    cat: "PCOS",
    read: "8 min",
    sections: [
      {
        heading: "Understanding the PCOS Fat Loss Plateau",
        paragraphs: [
          "Polycystic Ovary Syndrome (PCOS) is not just a reproductive disorder; it is a metabolic one. Up to 70% of women with PCOS suffer from insulin resistance. This means your body struggles to clear glucose from the bloodstream, storing it as fat instead (especially around the abdomen).",
          "If you have PCOS and have tried standard calorie restriction, you've probably hit a wall. Conventional advice doesn't work because it doesn't address the underlying hormonal environment. To lose fat with PCOS, we must focus on insulin sensitivity and cortisol management.",
        ],
      },
      {
        heading: "Pillar 1: Stop the Insulin Rollercoaster",
        paragraphs: [
          "Every time you eat simple carbs (sugar, biscuits, maida, white rice), your insulin spikes. For a PCOS body, that spike is dramatic and long-lasting, blocking fat burning for hours. Your goal is to keep glucose levels stable.",
          "Always pair carbohydrates with a protein and a healthy fat. Never eat 'naked' carbs. If you are having an apple, pair it with 10 almonds. If you are having rice, pair it with double the amount of chicken or paneer.",
        ],
      },
      {
        heading: "Pillar 2: Swap Extreme HIIT for Strength Training",
        paragraphs: [
          "Many women with PCOS believe they need to do hours of sweaty cardio or high-intensity interval training (HIIT) to burn fat. In reality, excessive HIIT spikes cortisol (the stress hormone).",
          "PCOS bodies are already under chronic stress. Higher cortisol increases insulin resistance and promotes fat storage. Instead, switch to progressive strength training (lifting dumbbells or using resistance bands) 3-4 times a week. Strength training builds muscle, which naturally absorbs glucose from your bloodstream without needing insulin, reversing insulin resistance over time.",
        ],
      },
      {
        heading: "The Three Essential PCOS Food Swaps",
        paragraphs: ["You don't need to starve. Start with these three swaps in your kitchen:"],
        list: {
          items: [
            "Swap 1: Maida/wheat roti -> Jowar or Ragi roti. Jowar is gluten-free and has a much lower glycemic index, preventing insulin spikes.",
            "Swap 2: Refined seed oils (Sunflower/Soybean) -> Cold-pressed mustard oil, coconut oil, or ghee. Refined oils cause systemic inflammation, worsening PCOS symptoms.",
            "Swap 3: Evening biscuits/rusk -> Pumpkin seeds and walnuts. Walnuts help reduce androgen levels, improving skin health and cycle regularity.",
          ],
        },
        callout:
          "💡 Did you know? Lifting weights 3 times a week can improve insulin sensitivity in women with PCOS by up to 25% in just 8 weeks, even without changing body weight!",
      },
    ],
  },
  "strength-after-35": {
    title: "Strength Training After 35 — A Pune Guide",
    subtitle:
      "Joints, recovery, and the 4-day split that keeps working professionals strong, mobile, and pain-free.",
    cat: "Strength",
    read: "7 min",
    sections: [
      {
        heading: "Sarcopenia: The Silent Muscle Thief",
        paragraphs: [
          "Once you cross the age of 30, your body begins to undergo a silent transformation. Without active intervention, you lose between 3% to 5% of your muscle mass per decade. This condition is called sarcopenia.",
          "For working professionals in Pune, this muscle loss is accelerated by long hours at a desk, sitting in traffic, and high stress. Muscle loss slows your metabolism, leads to weight gain, and results in chronic aches like lower back pain and cervical spondylosis. Strength training is no longer about looking good in a t-shirt—it is about functional youth.",
        ],
      },
      {
        heading: "Why Cardio Isn't Enough",
        paragraphs: [
          "Many people over 35 pick up running, cycling, or walking. While great for cardiovascular health, cardio does not build muscle or bone density. In fact, excessive running without a strength base can accelerate joint wear, especially in the knees.",
          "Weight training stimulates osteoblasts—the cells that build bone density. It also strengthens the tendons and muscles surrounding your joints, acting as a natural brace. If you have knee pain, the solution isn't to stop moving; it's to strengthen your quads and glutes.",
        ],
      },
      {
        heading: "The 4-Day Joint-Friendly Split",
        paragraphs: [
          "For busy professionals, we recommend a 4-day split that balances high recovery with progressive load:",
        ],
        list: {
          items: [
            "Monday: Upper Body Push/Pull. Focus on lat pulldowns, dumbbell chest presses, and seated rows. This corrects desk posture.",
            "Tuesday: Lower Body Squat/Hip hinge. Focus on Goblet Squats and Romanian Deadlifts (RDLs) to strengthen glutes and lower back.",
            "Thursday: Shoulder Stability & Arms. Dumbbell shoulder presses and face pulls to protect the rotator cuff.",
            "Friday: Lower Body Core & unilateral. Lunges, glute bridges, and planks. Crucial for balancing left/right strength discrepancies.",
          ],
        },
      },
      {
        heading: "Recovery Rules for 35+",
        paragraphs: [
          "Your recovery capacity is lower than it was at 20. To train pain-free, you must follow these rules:",
        ],
        list: {
          items: [
            "Warm-up: Spend 10 minutes doing dynamic mobility (arm circles, leg swings, cat-camel) before touching a weight.",
            "Protein: Consume 1.5 to 1.8 grams of protein per kilogram of body weight to repair muscle tissue.",
            "Hydration: Sit with a 1-liter bottle at your desk and finish it 3 times during the work day.",
          ],
        },
        callout:
          "🛡️ Safety First: Always focus on form over weight. A slow, controlled lift with a lighter dumbbell is 10x more effective and safer than ego-lifting heavy weights with poor posture.",
      },
    ],
  },
  "week-six-cliff": {
    title: "Why Most Transformations Fail at Week 6",
    subtitle:
      "The motivation cliff is real. Here's the accountability system that gets clients past it — every time.",
    cat: "Mindset",
    read: "5 min",
    sections: [
      {
        heading: "The Motivation Illusion",
        paragraphs: [
          "When you start a new fitness journey, motivation is at an all-time high. You buy new workout clothes, stock your fridge with vegetables, and jump out of bed at 6:00 AM. But motivation is an emotion, and like all emotions, it is temporary.",
          "By week 6, the initial excitement has faded. The scales might have stalled for a few days, work stress piles up, and old habits start calling. This is the 'Motivation Cliff'—the exact point where 80% of gym memberships are abandoned.",
        ],
      },
      {
        heading: "The Plateau Illusion",
        paragraphs: [
          "One of the biggest triggers for quitting at week 6 is a perceived lack of progress. In the first few weeks, you lose water weight quickly. By week 6, fat loss slows down to a sustainable 0.5kg per week.",
          "This is not a plateau; it is normal fat loss. But because the scale isn't dropping by 2kg a week anymore, people assume the plan has stopped working and give up. We must train ourselves to look at non-scale victories.",
        ],
      },
      {
        heading: "How to Build a Week-6 Proof System",
        paragraphs: ["To get past week 6, you must replace motivation with a structured system:"],
        list: {
          items: [
            "Schedule workouts like business meetings: Do not wait to 'feel' like working out. Put it in your calendar. If you miss a slot, reschedule it, don't cancel it.",
            "Focus on non-scale progress: Check your energy levels at 4:00 PM, how deeply you sleep, how loose your jeans feel, and your strength progress in the gym.",
            "Implement daily accountability: Have a coach or a dedicated partner check in on your food and workouts daily. It is easy to skip a workout when nobody is watching. It is hard when someone asks for a photo of your plate.",
          ],
        },
        callout:
          "🤝 Pravin's Rule: One bad meal is just a slip. Two bad meals is the start of a new bad habit. If you have a heavy lunch, don't throw away the whole day. Just make dinner clean.",
      },
    ],
  },
  "type-2-reverse": {
    title: "Type 2 Diabetes: Reverse It With Food + Training",
    subtitle:
      "What the research says, what we do with clients, and the simple weekly structure that drops HbA1c.",
    cat: "Diabetes",
    read: "9 min",
    sections: [
      {
        heading: "Type 2 Diabetes is a Reversible Disease",
        paragraphs: [
          "For decades, diabetics were told that their condition is a progressive, life-long illness that can only be managed with increasing doses of insulin and metformin. Modern clinical science has completely disproven this.",
          "Type 2 diabetes is primarily a disease of insulin resistance and ectopic fat storage (fat deposited in the liver and pancreas). By dropping body fat, building muscle, and adjusting nutrition, we can clear this fat, restore pancreatic function, and bring HbA1c back into the healthy range.",
        ],
      },
      {
        heading: "The Muscle-Glucose Connection",
        paragraphs: [
          "Your skeletal muscle is your body's primary storage sink for glucose. When you eat carbohydrates, they are broken down into glucose and stored in your muscles as glycogen.",
          "When you are sedentary, your muscle sinks are full. Any additional glucose remains in your bloodstream, forcing your pancreas to pump more insulin, leading to type 2 diabetes. Strength training empties these sinks. When you lift weights, your muscles absorb glucose directly from your blood without needing insulin—a process called insulin-independent glucose uptake. This immediately lowers blood sugar levels.",
        ],
      },
      {
        heading: "The Diabetes Nutrition Framework",
        paragraphs: ["To reverse insulin resistance, we focus on three dietary principles:"],
        list: {
          items: [
            "High Fiber, Complex Carbs: Swap white rice and refined wheat for whole grains like brown rice, oats, jowar, and bajra. Fiber slows down glucose absorption, preventing post-meal spikes.",
            "Protein First: Always consume your protein source (paneer, eggs, chicken) before your carbohydrates. This slows down gastric emptying and significantly flattens the glucose curve.",
            "Healthy Fats for Satiety: Include nuts, seeds, and ghee in moderation. They keep you full and prevent sweet cravings.",
          ],
        },
      },
      {
        heading: "The Weekly Active Protocol",
        paragraphs: ["This is the weekly activity structure we use with diabetic clients:"],
        list: {
          items: [
            "3 sessions of full-body resistance training (45 minutes each). Focus on large muscle groups like legs and back.",
            "A 15-minute brisk walk immediately after dinner. This is the single most effective habit for reducing fasting blood glucose levels.",
            "Achieve 8,000 steps daily to maintain general insulin sensitivity.",
          ],
        },
        callout:
          "📢 Disclaimer: Reversing diabetes requires close tracking. As your blood sugar drops, you must coordinate with your doctor to safely taper off your medications.",
      },
    ],
  },
  "five-lean-habits": {
    title: "The 5 Daily Habits Every Lean Indian Has",
    subtitle:
      "Hydration, sleep, walking, protein, and the one thing nobody talks about. Steal these starting tomorrow.",
    cat: "Habits",
    read: "4 min",
    sections: [
      {
        heading: "Being Lean is a Daily Practice",
        paragraphs: [
          "People who maintain a healthy, lean physique year-round don't live in a state of constant starvation. They don't do extreme juice cleanses or spend 2 hours a day in the gym.",
          "Instead, their lifestyles are anchored by a few non-negotiable daily habits. These habits are simple, but when repeated 365 days a year, they create a compounding effect that makes fat gain virtually impossible.",
        ],
      },
      {
        heading: "Habit 1: 10,000 Steps (The NEAT Secret)",
        paragraphs: [
          "Non-Exercise Activity Thermogenesis (NEAT) is the energy we expend for everything we do that is not sleeping, eating, or sports-like exercise. Walking to your car, pacing while on calls, and taking the stairs make up NEAT.",
          "NEAT accounts for up to 15-30% of your daily calorie burn, whereas your 1-hour gym workout only accounts for 5%. Lean people stay active throughout the day. Aim for a baseline of 10,000 steps daily.",
        ],
      },
      {
        heading: "Habit 2: Protein in Every Single Meal",
        paragraphs: [
          "Protein has the highest Thermic Effect of Food (TEF)—your body burns 20-30% of the calories in protein just to digest it. Protein also stimulates satiety hormones (PYY and GLP-1), keeping you full.",
          "Lean individuals make sure there is a portion of eggs, chicken, paneer, tofu, or whey protein in every meal they eat.",
        ],
      },
      {
        heading: "Habit 3: 3.5 Liters of Water",
        paragraphs: [
          "Mild dehydration triggers hunger signals in the brain. When you feel a sudden craving at 4:00 PM, it is often just your body asking for water.",
          "Drink 3.5 liters of water daily. Keep a bottle on your desk at all times. Hydrated muscles also perform better in the gym, leading to faster progress.",
        ],
      },
      {
        heading: "Habit 4: 7.5 Hours of Quality Sleep",
        paragraphs: [
          "Sleep deprivation is a fast-track to fat gain. When you sleep less than 6 hours, your body produces more ghrelin (the hunger hormone) and less leptin (the fullness hormone). You will naturally crave sugar and carbs the next day.",
          "Aim for 7-8 hours of sleep. Keep your bedroom cool, dark, and screen-free 30 minutes before bed.",
        ],
      },
      {
        heading: "Habit 5: The 80/20 Rule for Consistency",
        paragraphs: [
          "Never aim for 100% perfection. It leads to frustration and eventual bingeing.",
          "Follow the 80/20 rule: 80% of your calories should come from single-ingredient, high-protein, nutrient-dense whole foods. The other 20% can come from your favorite meals (social dinners, a slice of cake, a biryani). This makes the fitness lifestyle enjoyable and lifelong.",
        ],
      },
    ],
  },
};

function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Sync state with URL search params on mount or when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get("post");
    if (postSlug && articleContents[postSlug]) {
      setSelectedSlug(postSlug);
    } else {
      setSelectedSlug(null);
    }
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedSlug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSlug]);

  const handleSelectPost = (slug: string | null) => {
    setSelectedSlug(slug);
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set("post", slug);
    } else {
      url.searchParams.delete("post");
    }
    window.history.pushState({}, "", url.toString());
  };

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

  const activeArticle = selectedSlug ? articleContents[selectedSlug] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
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
                type="button"
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
                    <button
                      type="button"
                      onClick={() => handleSelectPost(p.slug)}
                      className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded hover:text-gold"
                    >
                      {p.title}
                    </button>
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <button
                    onClick={() => handleSelectPost(p.slug)}
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold transition-all hover:text-gold-light group/link cursor-pointer bg-transparent border-0"
                  >
                    Read article{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
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
                type="button"
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

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {selectedSlug && activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-md p-4 overflow-y-auto"
            onClick={() => handleSelectPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl rounded-3xl border border-gold/30 bg-card p-6 md:p-10 shadow-2xl my-8 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => handleSelectPost(null)}
                type="button"
                className="absolute right-4 top-4 rounded-full border border-border p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-background"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Category & Read Time */}
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] mb-4">
                <span
                  className={`rounded-full border px-3 py-1 font-semibold ${
                    categoryColors[activeArticle.cat] || "border-gold/40 text-gold"
                  }`}
                >
                  {activeArticle.cat}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> {activeArticle.read}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display text-4xl leading-tight tracking-wide md:text-5xl text-gradient-gold">
                {activeArticle.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed font-serif italic border-l-2 border-gold/50 pl-4">
                {activeArticle.subtitle}
              </p>

              <div className="h-px bg-border/50 my-8" />

              {/* Article Content */}
              <div className="space-y-8 text-muted-foreground leading-relaxed">
                {activeArticle.sections.map((section, sectionIndex) => (
                  <div key={section.heading || `sec-${sectionIndex}`} className="space-y-4">
                    {section.heading && (
                      <h2 className="font-display text-2xl tracking-wide text-foreground mt-6">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-base">
                        {p}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="space-y-2.5 pl-1 my-4">
                        {section.list.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.callout && (
                      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5 my-6">
                        <p className="text-sm italic text-gold">{section.callout}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA Box */}
              <div className="mt-12 rounded-3xl border border-gold bg-gradient-card p-6 md:p-8 text-center shadow-gold">
                <h3 className="font-display text-3xl tracking-wide text-foreground">
                  Ready to Re-Engineer Your Body?
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                  Get a fully customized Indian diet and training plan matching your exact body
                  type, schedule, and fitness goals. 1500+ successful transformations.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/booking"
                    onClick={() => handleSelectPost(null)}
                    className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-background shadow-gold transition-transform hover:scale-105"
                  >
                    Book Your Free Consult
                  </Link>
                  <a
                    href="https://wa.me/919272432562"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition-all"
                  >
                    Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
