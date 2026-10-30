"use client";

import Aurora from "@/components/bits/Aurora/Aurora";
import { BorealDemo } from "@/components/landing/BorealDemo";
import { Band } from "@/components/layout/Band";
import { ButtonLink, Mark, Reveal, Wallpaper } from "@/components/ui";
import { t } from "@/i18n/t";
import { palette } from "@/lib/palette";

export function Hero() {
  return (
    <Band id="top" tone="night" guides={[]} className="isolate overflow-hidden">
      <div className="grain" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[720px] opacity-60" aria-hidden="true">
        <div className="aurora-css">
          <span />
          <span />
          <span />
        </div>
        <Aurora colorStops={[palette.glacier, palette.aurora, palette.glacier]} amplitude={1} blend={0.55} speed={0.5} dpr={1} />
      </div>
      <div className="flex flex-col items-center px-6 pt-40 pb-16 text-center md:px-8 md:pt-48 md:pb-20">
        <Reveal className="flex flex-col items-center">
          <h1 className="max-w-[16ch] text-[clamp(42px,6.2vw,84px)] leading-[1.02] font-semibold tracking-[-0.045em]">
            <span className="inline-flex items-center gap-[0.18em] text-aurora">
              <Mark className="size-[0.74em] translate-y-[0.07em]" />
              {t("hero.name")}
            </span>{" "}
            {t("hero.rest")}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-night-muted md:text-xl">{t("hero.lead")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/#contact">{t("hero.primary")}</ButtonLink>
            <ButtonLink href="/#services" variant="glass">
              {t("hero.secondary")}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-20 w-full max-w-[1180px] md:mt-24">
          <div className="relative isolate overflow-hidden rounded-[22px] p-[4%] ring-1 ring-white/10">
            <Wallpaper src="/backgrounds/dunes.jpg" priority />
            <BorealDemo />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
