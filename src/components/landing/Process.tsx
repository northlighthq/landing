import { Check } from "lucide-react";
import Image from "next/image";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { Band } from "@/components/layout/Band";
import { Reveal, Wallpaper } from "@/components/ui";
import { t, tList } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";

type Step = { title: string; body: string; result: string; image: string; wallpaper: string; alt: string };

export function Process() {
  const steps = tList<Step>("process.steps");

  return (
    <>
      <Band id="process" tone="soft" guides={[]}>
        <div className="grid gap-5 px-6 pt-24 pb-14 md:px-8 md:pt-32">
          <SectionTitle title={t("process.title")} />
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{t("process.lead")}</p>
        </div>
      </Band>
      {steps.map((step, index) => (
        <Band key={step.title} tone="soft" guides={[50]}>
          <div className="grid md:grid-cols-2">
            <Reveal className="grid content-center gap-4 px-6 py-14 md:px-12 md:py-20">
              <h3 className="text-[clamp(28px,3vw,40px)] leading-[1.05] font-medium tracking-[-0.035em]">{step.title}</h3>
              <p className="max-w-[40ch] text-lg leading-relaxed text-muted">{step.body}</p>
              <p className="mt-2 flex items-center gap-2 text-[15px] font-medium">
                <Check className="size-4 text-aurora-strong" />
                {step.result}
              </p>
            </Reveal>
            <div className={cn("p-3 md:p-4", index % 2 === 1 && "md:order-first")}>
              <Reveal delay={0.1} className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl">
                <Wallpaper src={step.wallpaper} />
                <Image
                  src={asset(step.image)}
                  alt={t(`process.steps.${index}.alt`)}
                  width={1440}
                  height={900}
                  className={cn("absolute top-[11%] w-[118%] max-w-none rounded-xl shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/15", index % 2 === 1 ? "right-[9%]" : "left-[9%]")}
                />
              </Reveal>
            </div>
          </div>
        </Band>
      ))}
    </>
  );
}
