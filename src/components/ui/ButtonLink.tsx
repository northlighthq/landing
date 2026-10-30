import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "glass" | "dark" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-aurora text-night hover:bg-white",
  light: "bg-white text-night hover:bg-aurora",
  glass: "text-night-text ring-1 ring-white/25 ring-inset hover:bg-white/10 hover:ring-white/40",
  dark: "bg-text text-bg hover:bg-night-surface",
  ghost: "bg-surface text-text ring-1 ring-line-strong ring-inset hover:ring-text",
};

const chips: Record<Variant, string> = {
  primary: "bg-night text-aurora",
  light: "bg-night text-white",
  glass: "bg-white/15 text-white",
  dark: "bg-aurora text-night",
  ghost: "bg-text text-bg",
};

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-3 rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora",
        arrow ? "pr-1.5 pl-5" : "px-5",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow ? (
        <span className={cn("grid size-9 place-items-center overflow-hidden rounded-full", chips[variant])}>
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      ) : null}
    </Link>
  );
}
