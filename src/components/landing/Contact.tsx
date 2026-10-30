"use client";

import Aurora from "@/components/bits/Aurora/Aurora";
import { Band } from "@/components/layout/Band";
import { ButtonLink, Mark, Reveal } from "@/components/ui";
import { LazyMount } from "@/components/ui/LazyMount";
import { t } from "@/i18n/t";
import { palette } from "@/lib/palette";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Band id="contact" tone="night" guides={[]} className="isolate overflow-hidden">
      <LazyMount className="absolute inset-x-0 top-0 -z-10 h-[620px] opacity-60">
        <div className="aurora-css">
          <span />
          <span />
          <span />
        </div>
        <Aurora colorStops={[palette.glacier, palette.aurora, palette.glacier]} amplitude={1} blend={0.55} speed={0.5} dpr={1} />
      </LazyMount>
      <div className="flex flex-col items-center px-6 py-28 text-center md:px-8 md:py-36">
        <Reveal className="flex flex-col items-center">
          <Mark className="size-12 text-aurora md:size-14" />
          <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(40px,5.6vw,80px)] leading-[1] font-semibold tracking-[-0.05em]">
            {t("contact.title")} <span className="text-aurora">{t("contact.accent")}</span>
          </h2>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-night-muted md:text-xl">{t("contact.body")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.contact}>{t("contact.primary")}</ButtonLink>
            <ButtonLink href="/#process" variant="glass">
              {t("contact.secondary")}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
