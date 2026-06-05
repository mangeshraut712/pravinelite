import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Youtube, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-border bg-card/40" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <img
                src={logoImg}
                alt="Pravin Elite Logo"
                className="size-16 rounded-full object-contain"
                width={64}
                height={64}
                loading="lazy"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Pune's premier personal training studio. Real food, real training, real results
              since 2020.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/pravinelitefitness_india"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2.5 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/@PravinEliteFitness"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2.5 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                aria-label="YouTube"
              >
                <Youtube className="size-4" />
              </a>
              <a
                href="https://wa.me/919272432562"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2.5 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-lg tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { to: "/services", label: "Services" },
                { to: "/programs", label: "Programs" },
                { to: "/calculator", label: "BMI Calculator" },
                { to: "/blog", label: "Insights" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block transition-all hover:text-gold hover:translate-x-1 duration-200 focus-visible:outline-none focus-visible:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Links */}
          <div>
            <h4 className="mb-4 font-display text-lg tracking-wider">Start Here</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/booking"
                  className="inline-block transition-all hover:text-gold hover:translate-x-1 duration-200 focus-visible:outline-none focus-visible:underline"
                >
                  Book a Consult
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="inline-block transition-all hover:text-gold hover:translate-x-1 duration-200 focus-visible:outline-none focus-visible:underline"
                >
                  View Pricing
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919272432562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all hover:text-gold hover:translate-x-1 duration-200 focus-visible:outline-none focus-visible:underline"
                >
                  WhatsApp Now
                </a>
              </li>
              <li>
                <a
                  href="tel:+919272432562"
                  className="inline-block transition-all hover:text-gold hover:translate-x-1 duration-200 focus-visible:outline-none focus-visible:underline"
                >
                  Call +91 92724 32562
                </a>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="mb-4 font-display text-lg tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                Pune, Maharashtra
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href="mailto:Pravinelitefitness@gmail.com" className="hover:text-gold break-all">
                  Pravinelitefitness@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0 text-gold" />
                <a href="https://wa.me/919272432562" className="hover:text-gold">
                  +91 92724 32562
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Get Free Tips
              </h5>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gold"
                >
                  ✅ You're in! Check WhatsApp for your free starter guide.
                </motion.p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) {
                      setSubscribed(true);
                      setEmail("");
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    aria-label="Email for newsletter"
                    className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none transition-colors focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 rounded-xl bg-gradient-gold px-3 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="size-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Pravin Elite Fitness. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
