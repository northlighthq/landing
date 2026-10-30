import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function SectionTitle({ title, className }: { title: string; className?: string }) {
  return (
    <Reveal>
      <h2 className={cn("max-w-[14ch] font-display text-[clamp(34px,4.4vw,58px)] leading-[1] font-medium tracking-[-0.045em] text-balance", className)}>{title}</h2>
    </Reveal>
  );
}
