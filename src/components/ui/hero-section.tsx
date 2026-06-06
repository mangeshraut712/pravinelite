import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./section";

interface HeroSectionProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}

export function HeroSection({
  eyebrow,
  title,
  description,
  className,
  children,
  image,
}: HeroSectionProps) {
  return (
    <section
      className={cn("grain relative overflow-hidden bg-gradient-hero pt-40 pb-20", className)}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover opacity-30"
            width={1920}
            height={1280}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-6xl md:text-8xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
