import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface WhatsAppFabProps {
  hidden?: boolean;
}

export function WhatsAppFab({ hidden = false }: WhatsAppFabProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const hasAutoPromptedRef = useRef(false);

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
    if (!popover || hidden || hasAutoPromptedRef.current) return;

    const timer = setTimeout(() => {
      if (!popover.matches(":popover-open")) {
        hasAutoPromptedRef.current = true;
        popover.showPopover();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hidden]);

  return (
    <div
      className={`fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 flex flex-col items-end gap-2 transition-opacity duration-200 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
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
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-7 text-white" />
        <span className="absolute -top-1 -right-1 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-[#25D366]" />
        </span>
      </a>
    </div>
  );
}
