import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/programs", label: "Programs" },
  { to: "/calculator", label: "Calculator" },
  { to: "/blog", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 20,
  );
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [routerState.location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5",
      )}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg transition-transform hover:scale-105 duration-200"
          aria-label="Pravin Elite Fitness — Home"
        >
          <img
            src={logoImg}
            alt="Pravin Elite Logo"
            className="size-16 rounded-full object-contain"
            width={64}
            height={64}
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {links.map((l) => {
            const isActive = routerState.location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive ? "text-gold" : "text-muted-foreground hover:text-gold",
                )}
                activeProps={{ className: "text-gold" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-lg bg-gold/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+919272432562"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Call us at +91 92724 32562"
          >
            <Phone className="size-4" />
            <span>+91 92724 32562</span>
          </a>
          <Link
            to="/booking"
            className="rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-background shadow-gold transition-all hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book Free Consult
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 flex size-10 items-center justify-center rounded-lg lg:hidden hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu with slide-down animation */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="glass mx-4 mt-3 rounded-2xl border border-border/50 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col px-4 py-3 smooth-expand" aria-label="Mobile navigation">
            {links.map((l) => {
              const isActive = routerState.location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-foreground hover:bg-gold/5 hover:text-gold",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-2 border-t border-border/50 pt-3">
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gradient-gold px-5 py-3.5 text-center text-sm font-semibold text-background shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Book Free Consult
              </Link>
              <a
                href="tel:+919272432562"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Phone className="size-4" /> +91 92724 32562
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
