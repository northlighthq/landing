import { Check } from "lucide-react";
import Image from "next/image";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { Band } from "@/components/layout/Band";
import { ButtonLink, Reveal, Wallpaper } from "@/components/ui";
import { t, tList } from "@/i18n/t";
import { products } from "@/lib/products";
import { asset } from "@/lib/site";

export function Boreal() {
  return (
    <>
      <Band id="products" tone="night" guides={[]}>
        <div className="grid gap-5 px-6 pt-24 pb-14 md:px-8 md:pt-32">
          <SectionTitle title={t("products.title")} />
          <Reveal delay={0.08}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-night-muted">{t("products.lead")}</p>
          </Reveal>
        </div>
      </Band>
      {products.map((product) => {
        const key = `products.${product.slug}`;
        const features = tList<string>(`${key}.features`);

        return (
          <Band key={product.slug} id={product.slug} tone="night" guides={[42]}>
            <div className="grid md:grid-cols-[42%_58%]">
              <Reveal className="grid content-center gap-6 px-6 py-14 md:px-10 md:py-20">
                <div className="flex items-center gap-4">
                  <Image src={asset(product.logo)} alt={t(`${key}.logoAlt`)} width={64} height={64} className="size-16" />
                  <h3 className="text-[32px] leading-none font-semibold tracking-[-0.035em]">{t(`${key}.name`)}</h3>
                </div>
                <p className="max-w-[42ch] text-[17px] leading-relaxed text-night-muted">{t(`${key}.body`)}</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[14.5px]">
                      <Check className="size-4 shrink-0 text-aurora" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-3">
                  <ButtonLink href={`/products/${product.slug}`}>{t("products.open")}</ButtonLink>
                  <ButtonLink href={product.download} variant="glass">
                    {t(`${key}.download`)}
                  </ButtonLink>
                </div>
              </Reveal>
              <div className="p-3 md:p-4">
                <Reveal delay={0.12} className="relative isolate h-full min-h-[360px] overflow-hidden rounded-2xl">
                  <Wallpaper src={product.wallpaper} />
                  <Image
                    src={asset(product.shot)}
                    alt={t(`${key}.shotAlt`)}
                    width={1440}
                    height={900}
                    className="absolute top-[12%] left-[8%] w-[125%] max-w-none rounded-xl shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
                  />
                </Reveal>
              </div>
            </div>
          </Band>
        );
      })}
    </>
  );
}
