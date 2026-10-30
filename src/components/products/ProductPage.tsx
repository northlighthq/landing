import { Check } from "lucide-react";
import Aurora from "@/components/bits/Aurora/Aurora";
import Image from "next/image";
import { BorealTour } from "@/components/products/BorealTour";
import { Band } from "@/components/layout/Band";
import { ButtonLink, Reveal, Wallpaper } from "@/components/ui";
import { t, tList } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { palette } from "@/lib/palette";
import type { Product } from "@/lib/products";
import { asset } from "@/lib/site";

type Section = { title: string; body: string; image: string; wallpaper: string; alt: string };

export function ProductPage({ product }: { product: Product }) {
  const key = `products.${product.slug}`;
  const features = tList<string>(`${key}.features`);
  const sections = tList<Section>(`${key}.sections`);

  return (
    <>
      <Band tone="night" guides={[]} className="isolate overflow-hidden">
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
            <Image src={asset(product.logo)} alt={t(`${key}.logoAlt`)} width={64} height={64} priority className="size-9 md:size-10" />
            <h1 className="mt-6 text-[clamp(36px,4.6vw,64px)] leading-[1.1] font-semibold tracking-[-0.04em]">
              {t(`${key}.headline`)}
              <span className="block">{t(`${key}.headline2`)}</span>
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-night-muted md:text-lg">{t(`${key}.lead`)}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={product.download}>{t(`${key}.download`)}</ButtonLink>
              <ButtonLink href={product.source} variant="glass">
                {t(`${key}.source`)}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-16 w-full max-w-[1180px]">
            <BorealTour wallpaper={product.wallpaper} />
          </Reveal>
        </div>
      </Band>
      <Band guides={[100 / 3, 200 / 3]}>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature} className="border-t border-grid first:border-t-0 sm:[&:nth-child(2)]:border-t-0 md:[&:nth-child(3)]:border-t-0">
              <Reveal delay={(index % 3) * 0.08} className="flex items-center gap-3 px-6 py-7 text-[17px] font-medium md:px-8">
                <Check className="size-5 shrink-0 text-aurora-strong" />
                {feature}
              </Reveal>
            </li>
          ))}
        </ul>
      </Band>
      {sections.map((section, index) => (
        <Band key={section.title} tone="soft" guides={[50]}>
          <div className="grid md:grid-cols-2">
            <Reveal className="grid content-center gap-4 px-6 py-14 md:px-12 md:py-20">
              <h2 className="text-[clamp(30px,3.2vw,44px)] leading-[1.05] font-medium tracking-[-0.035em]">{section.title}</h2>
              <p className="max-w-[40ch] text-lg leading-relaxed text-muted">{section.body}</p>
            </Reveal>
            <div className={cn("p-3 md:p-4", index % 2 === 1 && "md:order-first")}>
              <Reveal delay={0.1} className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl">
                <Wallpaper src={section.wallpaper} />
                <Image
                  src={asset(section.image)}
                  alt={t(`${key}.sections.${index}.alt`)}
                  width={1440}
                  height={900}
                  className={cn("absolute top-[12%] w-[118%] max-w-none rounded-xl shadow-[0_30px_60px_-24px_rgba(0,0,0,0.75)] ring-1 ring-black/10", index % 2 === 1 ? "right-[9%]" : "left-[9%]")}
                />
              </Reveal>
            </div>
          </div>
        </Band>
      ))}
    </>
  );
}
