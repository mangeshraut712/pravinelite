import { MessageCircle, X } from "lucide-react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function WhatsAppFab() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!dismissed) {
      const timer = setTimeout(() => setShowTooltip(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="relative rounded-2xl bg-card border border-gold/30 p-3 shadow-xl max-w-[200px]"
          >
            <button
              type="button"
              onClick={() => { setShowTooltip(false); setDismissed(true); }}
              className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="size-3" />
            </button>
            <p className="text-xs font-medium text-foreground">
              👋 Chat with Pravin!
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Replies within an hour
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <LazyMotion features={domAnimation}>
        <m.a
          href="https://wa.me/9175200391?text=Hi%20Pravin%2C%20I%27m%20interested%20in%20your%20training%20programs"
          target="_blank"
          rel="noopener"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="size-7 text-white" />
          <span className="absolute -top-1 -right-1 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-[#25D366]" />
          </span>
        </m.a>
      </LazyMotion>
    </div>
  );
}