import { SectionTitle } from "@/components/landing/SectionTitle";
import { Band } from "@/components/layout/Band";
import { Mark, Reveal } from "@/components/ui";
import { t, tList } from "@/i18n/t";

type Item = { title: string; body: string };

export function Principles() {
  const items = tList<Item>("principles.items");

  return (
    <>
      <Band id="principles" guides={[]}>
        <div className="px-6 pt-24 pb-14 md:px-8 md:pt-32">
          <SectionTitle title={t("principles.title")} />
        </div>
      </Band>
      <Band>
        <div className="grid sm:grid-cols-2 md:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.title} className="group grid content-start gap-4 border-b border-line p-6 transition-colors last:border-b-0 hover:bg-bg-soft md:border-b-0 md:p-8 md:pb-14">
              <Reveal delay={index * 0.08} className="grid gap-4">
                <Mark className="size-5 text-aurora transition-transform duration-500 group-hover:rotate-90" />
                <h3 className="text-[21px] font-medium tracking-[-0.025em]">{item.title}</h3>
                <p className="leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}
