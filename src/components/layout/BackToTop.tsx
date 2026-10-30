"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button type="button" onClick={scrollTop} className="group inline-flex items-center gap-2 rounded-lg border border-night-line px-3 py-2 transition-colors hover:border-night-muted hover:text-night-text">
      {label}
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
