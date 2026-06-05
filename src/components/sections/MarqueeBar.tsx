import { m, LazyMotion, domAnimation } from "framer-motion";

const items = [
  { id: "transformations", text: "1500+ TRANSFORMATIONS" },
  { id: "trainer", text: "PUNE'S ELITE TRAINER" },
  { id: "conditions", text: "PCOS - DIABETES - THYROID" },
  { id: "nutrition", text: "INDIAN NUTRITION DONE RIGHT" },
  { id: "modes", text: "IN-GYM - AT-HOME - ONLINE" },
  { id: "rating", text: "★ 4.9 RATED" },
  { id: "consult", text: "FREE 30-MIN CONSULT" },
];

export function MarqueeBar() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-card/40 py-5">
      <LazyMotion features={domAnimation}>
        <m.div
          className="flex shrink-0 gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {row.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="font-display text-2xl tracking-[0.2em] text-muted-foreground md:text-3xl"
            >
              <span className="text-gradient-gold">✦</span>&nbsp;&nbsp;{item.text}
            </span>
          ))}
        </m.div>
      </LazyMotion>
    </div>
  );
}
