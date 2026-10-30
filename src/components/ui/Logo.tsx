import { Mark } from "@/components/ui/Mark";
import { cn } from "@/lib/cn";

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.025em]", className)}>
      <Mark className={cn("size-[1.05em] text-aurora", markClassName)} />
      <span>Northlight</span>
    </span>
  );
}
