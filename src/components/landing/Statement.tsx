"use client";

import ScrollReveal from "@/components/bits/ScrollReveal/ScrollReveal";
import { Band } from "@/components/layout/Band";
import { t } from "@/i18n/t";

export function Statement() {
  return (
    <Band guides={[]}>
      <div className="px-6 py-32 md:px-8 md:py-44">
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          blurStrength={6}
          baseRotation={0}
          effect="fade"
          textClassName="max-w-[22ch] text-[clamp(30px,4.4vw,60px)] leading-[1.08] font-medium tracking-[-0.04em] text-text"
        >
          {t("statement")}
        </ScrollReveal>
      </div>
    </Band>
  );
}
