"use client";

import type { ReactNode } from "react";
import DotGrid from "@/components/bits/DotGrid/DotGrid";
import LineWaves from "@/components/bits/LineWaves/LineWaves";
import ShapeGrid from "@/components/bits/ShapeGrid/ShapeGrid";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { Band } from "@/components/layout/Band";
import { Reveal } from "@/components/ui";
import { LazyMount } from "@/components/ui/LazyMount";
import { t, tList } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { palette } from "@/lib/palette";

type Service = { key: string; title: string; body: string };

const backgrounds: Record<string, ReactNode> = {
  setup: <ShapeGrid shape="square" cellSize={36} lineWidth={1} direction="diagonal" speed={0.35} lineColor={palette.lineStrong} hoverFillColor={palette.auroraStrong} trail={8} glow={0.6} />,
  monitoring: <LineWaves color1={palette.glacier} color2={palette.aurora} color3={palette.auroraStrong} speed={0.35} lineCount={36} rotation={90} brightness={0.75} />,
  backups: <DotGrid dotSize={4} gap={16} baseColor={palette.lineStrong} activeColor={palette.aurora} proximity={120} />,
  migrations: <LineWaves color1={palette.auroraStrong} color2={palette.aurora} color3={palette.glacier} speed={0.25} lineCount={48} brightness={0.8} />,
  managed: <ShapeGrid shape="cross" cellSize={30} lineWidth={1} direction="up" speed={0.3} lineColor={palette.lineStrong} hoverFillColor={palette.aurora} trail={6} twinkle={0.4} />,
  audits: <ShapeGrid shape="hexagon" cellSize={34} lineWidth={1} direction="right" speed={0.25} lineColor={palette.lineStrong} hoverFillColor={palette.glacier} trail={6} glow={0.5} />,
};

export function Services() {
  const items = tList<Service>("services.items");

  return (
    <>
      <Band id="services" guides={[]}>
        <div className="px-6 pt-24 pb-14 md:px-8 md:pt-32">
          <SectionTitle title={t("services.title")} />
        </div>
      </Band>
      {[items.slice(0, 3), items.slice(3, 6)].map((row) => (
        <Band key={row[0]?.key} guides={[100 / 3, 200 / 3]}>
          <div className="grid md:grid-cols-3">
            {row.map((item, index) => (
              <article key={item.key} className={cn("group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden bg-bg-soft p-6 text-text md:p-8", index > 0 && "border-t border-grid md:border-t-0")}>
                <LazyMount className="absolute inset-0 -z-10 transition-opacity duration-500">{backgrounds[item.key]}</LazyMount>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-bg-soft via-bg-soft/85 to-transparent" />
                <Reveal delay={index * 0.08} className="pointer-events-none grid gap-2">
                  <h3 className="text-[22px] font-medium tracking-[-0.025em]">{item.title}</h3>
                  <p className="leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </Band>
      ))}
    </>
  );
}
