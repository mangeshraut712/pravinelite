import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface BackToTopProps {
  hidden?: boolean;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function BackToTop({ hidden = false }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.button
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          transition={reduceMotion ? { duration: 0.15 } : undefined}
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
          className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+10.5rem)] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-background shadow-gold transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-6"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
