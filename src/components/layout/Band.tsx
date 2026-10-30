import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "soft" | "night";

const tones: Record<Tone, { band: string; guide: string; sweep: string }> = {
  light: { band: "bg-bg", guide: "bg-grid", sweep: "[--sweep:var(--sweep-light)]" },
  soft: { band: "bg-bg-soft", guide: "bg-grid", sweep: "[--sweep:var(--sweep-light)]" },
  night: { band: "bg-night text-night-text", guide: "bg-grid-night", sweep: "" },
};

export function Band({
  id,
  tone = "light",
  guides = [25, 50, 75],
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  guides?: number[];
  className?: string;
  children: ReactNode;
}) {
  const style = tones[tone];

  return (
    <section id={id} className={cn("relative scroll-mt-24", style.band, className)}>
      <span className={cn("flicker-line pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px", style.guide)} aria-hidden="true" />
      <span className={cn("flicker-sweep pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px", style.sweep)} aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px]">
        {children}
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <span className={cn("flicker-line absolute inset-y-0 left-0 w-px", style.guide)} />
          <span className={cn("flicker-line absolute inset-y-0 right-0 w-px", style.guide)} />
          {guides.map((left) => (
            <span key={left} className={cn("flicker-line absolute inset-y-0 hidden w-px -translate-x-1/2 md:block", style.guide)} style={{ left: `${left}%` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
