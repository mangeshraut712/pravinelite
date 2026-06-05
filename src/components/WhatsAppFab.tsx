import { MessageCircle, X } from "lucide-react";
import { useRef, useEffect } from "react";

export function WhatsAppFab() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Auto-show popover after 5 seconds
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    const timer = setTimeout(() => {
      if (!popover.matches(":popover-open")) {
        popover.showPopover();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
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
        ref={buttonRef}
        href="https://wa.me/919272432562?text=Hi%20Pravin%2C%20I%27m%20interested%20in%20your%20training%20programs"
        target="_blank"
        rel="noopener"
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
