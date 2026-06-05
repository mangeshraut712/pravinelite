import { Section, Eyebrow, Reveal } from "@/components/ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "how-different",
    q: "How is this different from a regular gym trainer?",
    a: "Most gym trainers give the same plan to everyone. Pravin builds your program from scratch — your goal, your body, your food, your schedule. Daily WhatsApp accountability and weekly reviews are built in. You're not paying for sessions; you're paying for transformation.",
  },
  {
    id: "food-options",
    q: "Do I need to eat boiled chicken and broccoli?",
    a: "Never. Your plan is built around real Indian food — dal, sabji, roti, rice, paneer, eggs, biryani on cheat day. Veg, non-veg, Jain, and regional variations (Maharashtrian, South, Gujarati, North) are all supported.",
  },
  {
    id: "medical-conditions",
    q: "I have PCOS / diabetes / thyroid. Can you still help?",
    a: "Yes — these are specialties. We use evidence-based protocols and coordinate with your physician when needed. Hundreds of clients with PCOS, Type 2 diabetes, and thyroid disorders have transformed under our care.",
  },
  {
    id: "timeline",
    q: "How long until I see results?",
    a: "Visible changes in 3–4 weeks if you follow the plan. Most clients hit major milestones (−5 to −10 kg, strength PRs, better sleep) by week 6. The 45-Day Challenge is built around this curve.",
  },
  {
    id: "location",
    q: "What if I'm not in Pune?",
    a: "Online coaching works pan-India. You get the same custom plan, WhatsApp accountability, and weekly video calls — wherever you live in India.",
  },
  {
    id: "payment",
    q: "What's the payment structure?",
    a: "One-time payment for 45-Day or 90-Day programs. Nutrition Only is month-to-month. UPI, GPay, PhonePe, Paytm, cards, and no-cost EMI on ₹3,000+ all accepted via Razorpay. 100% satisfaction guarantee.",
  },
  {
    id: "supplements",
    q: "Will I get pushed to buy supplements?",
    a: "No. We earn nothing on supplements. If something is genuinely useful (protein powder, vitamin D3 for Indians, etc.), we'll tell you — and tell you exactly which trusted brand to buy. Otherwise, food first.",
  },
];

export function FAQ() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">
            Asked & <span className="text-gradient-gold">Answered</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you wanted to know before booking your free consult.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="border-b border-border">
                <AccordionTrigger className="text-left font-display text-base tracking-wide hover:text-gold hover:no-underline sm:text-lg md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
