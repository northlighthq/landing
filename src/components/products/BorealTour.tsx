"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Wallpaper } from "@/components/ui";
import { t } from "@/i18n/t";
import { asset } from "@/lib/site";

const W = 1440;
const H = 900;

type Stop = { image: string; x: number; y: number };

const stops: Stop[] = [
  { image: "/screens/home.png", x: 980, y: 700 },
  { image: "/screens/terminal.png", x: 750, y: 507 },
  { image: "/screens/sftp.png", x: 26, y: 118 },
  { image: "/screens/snippets.png", x: 26, y: 162 },
  { image: "/screens/forwards.png", x: 26, y: 250 },
];

export function BorealTour({ wallpaper }: { wallpaper: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current?.querySelector<HTMLDivElement>("[data-screen]");
    if (!host) {
      return;
    }

    const stage = host.querySelector<HTMLDivElement>("[data-stage]");
    if (!stage) {
      return;
    }

    const resize = new ResizeObserver(() => {
      stage.style.transform = `scale(${host.clientWidth / W})`;
      stage.style.opacity = "1";
    });
    resize.observe(host);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => resize.disconnect();
    }

    const cursor = host.querySelector<SVGSVGElement>("[data-cursor]");
    const ripple = host.querySelector<HTMLDivElement>("[data-ripple]");
    const layers = [...host.querySelectorAll<HTMLElement>("[data-layer]")];
    const hold = 4.2;

    const ctx = gsap.context(() => {
      gsap.set(cursor, { x: stops[0].x, y: stops[0].y, force3D: true });
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
      tl.set(layers.slice(1), { opacity: 0 }).set(cursor, { x: stops[0].x, y: stops[0].y, opacity: 1, scale: 1 }).to({}, { duration: 1.4 });

      stops.slice(1).forEach((stop, i) => {
        const layer = layers[i + 1];
        tl.to(cursor, { x: stop.x, y: stop.y, duration: 1.3, ease: "power3.inOut" })
          .to(cursor, { scale: 0.85, duration: 0.1, ease: "power1.out" })
          .set(ripple, { x: stop.x, y: stop.y, scale: 0.3, opacity: 1 }, "<")
          .to(ripple, { scale: 1.6, opacity: 0, duration: 0.7, ease: "power2.out" }, "<")
          .to(cursor, { scale: 1, duration: 0.18, ease: "power1.out" })
          .to(layer, { opacity: 1, duration: 0.8, ease: "power2.out" }, "<")
          .to(cursor, { x: Math.min(stop.x + 240, 1180), y: Math.min(stop.y + 160, 820), duration: hold - 0.4, ease: "sine.inOut" }, "<0.2");
      });

      tl.to(cursor, { opacity: 0, duration: 0.5 }).to(layers.slice(1), { opacity: 0, duration: 0.9, ease: "power2.inOut" });
    }, host);

    return () => {
      ctx.revert();
      resize.disconnect();
    };
  }, []);

  return (
    <div ref={root}>
      <div className="relative isolate overflow-hidden rounded-[22px] p-[4%] ring-1 ring-white/10">
        <Wallpaper src={wallpaper} priority />
        <div role="img" aria-label={t("products.boreal.tourLabel")} data-screen className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
          <div data-stage className="absolute top-0 left-0 h-[900px] w-[1440px] origin-top-left opacity-0">
            {stops.map((stop, index) => (
              <Image key={stop.image} data-layer src={asset(stop.image)} alt="" width={W} height={H} priority={index === 0} className="absolute inset-0 h-[900px] w-[1440px] max-w-none will-change-[opacity]" style={{ opacity: index === 0 ? 1 : 0 }} />
            ))}
            <div data-ripple className="pointer-events-none absolute -mt-5 -ml-5 size-10 rounded-full border-2 border-aurora opacity-0" />
            <svg data-cursor viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-30 size-[26px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              <path d="M4 2.5v17.2l4.6-4.4 3 6.8 3.1-1.4-3-6.6h6.3z" fill="#fff" stroke="#050d0a" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
