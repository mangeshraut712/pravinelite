import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WhatsAppFabProps {
  hidden?: boolean;
}

export function WhatsAppFab({ hidden = false }: WhatsAppFabProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const hasAutoPromptedRef = useRef(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  const isVisible = !isMobile || isScrolled;

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 280);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover || !hidden) return;

    if (popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  }, [hidden]);

  // Auto-show popover after 5 seconds
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover || hidden || isMobile || hasAutoPromptedRef.current || !isVisible) return;

    const timer = setTimeout(() => {
      if (!popover.matches(":popover-open")) {
        hasAutoPromptedRef.current = true;
        popover.showPopover();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hidden, isMobile, isVisible]);

  return (
    <div
      className={`fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 flex flex-col items-end gap-2 transition-all duration-200 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] ${
        hidden || !isVisible
          ? "pointer-events-none translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={hidden || !isVisible}
    >
      {/* Native popover tooltip — uses HTML Popover API (2025+), no JS animation overhead */}
      <div ref={popoverRef} id="whatsapp-tooltip" popover="auto" className="popover-native">
        <button
          type="button"
          popoverTarget="whatsapp-tooltip"
          popoverTargetAction="hide"
          className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="size-3" />
        </button>
        <p className="text-xs font-medium text-foreground">👋 Chat with Pravin!</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Replies within an hour</p>
      </div>

      <a
        href="https://wa.me/919272432562?text=Hi%20Pravin%2C%20I%27m%20interested%20in%20your%20training%20programs"
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40 transition-shadow hover:shadow-[#25D366]/60 active:scale-95 sm:size-14 sm:hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-6 text-white sm:size-7" />
        <span className="absolute -top-1 -right-1 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-[#25D366]" />
        </span>
      </a>
    </div>
  );
}
