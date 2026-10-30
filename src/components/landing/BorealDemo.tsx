"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { t } from "@/i18n/t";
import { demo } from "@/lib/demo";
import { asset } from "@/lib/site";

const W = demo.width;
const H = demo.height;
const stopped = new Error("stopped");

function part<T extends Element>(root: HTMLElement, name: string): T {
  return root.querySelector(`[data-part="${name}"]`) as T;
}

export function BorealDemo() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) {
      return;
    }

    const stage = part<HTMLDivElement>(host, "stage");
    const resize = new ResizeObserver(() => {
      stage.style.transform = `scale(${host.clientWidth / W})`;
      stage.style.opacity = "1";
    });
    resize.observe(host);

    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const host = root.current;
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let alive = true;
    const camera = part<HTMLDivElement>(host, "camera");
    const cursor = part<SVGSVGElement>(host, "cursor");
    const ripple = part<HTMLDivElement>(host, "ripple");
    const lines = part<HTMLDivElement>(host, "lines");
    const hover = part<HTMLDivElement>(host, "hover");
    const terminal = part<HTMLDivElement>(host, "terminal");
    const snippets = part<HTMLImageElement>(host, "snippets");
    const toggle = part<HTMLImageElement>(host, "toggle");
    const toast = part<HTMLDivElement>(host, "toast");
    const ctx = gsap.context(() => {}, host);

    function check() {
      if (!alive) {
        throw stopped;
      }
    }

    async function wait(ms: number) {
      await new Promise((resolve) => setTimeout(resolve, ms));
      check();
    }

    async function to(target: gsap.TweenTarget, vars: gsap.TweenVars) {
      await new Promise((resolve) => ctx.add(() => gsap.to(target, { ...vars, onComplete: resolve })));
      check();
    }

    function background(task: Promise<unknown>) {
      task.catch(() => undefined);
    }

    function move(x: number, y: number, duration = 0.9) {
      return to(cursor, { x, y, duration, ease: "power3.inOut" });
    }

    async function click() {
      gsap.set(ripple, {
        x: gsap.getProperty(cursor, "x"),
        y: gsap.getProperty(cursor, "y"),
        scale: 0.3,
        opacity: 1,
      });
      gsap.to(ripple, {
        scale: 1.5,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
      });
      await to(cursor, { scale: 0.8, duration: 0.08 });
      await to(cursor, { scale: 1, duration: 0.14 });
    }

    function highlight(left: number, top: number, width: number, height: number) {
      gsap.set(hover, { left, top, width, height });
      gsap.to(hover, { opacity: 1, duration: 0.15 });
    }

    function unhighlight() {
      gsap.to(hover, { opacity: 0, duration: 0.2 });
    }

    function zoom(scale: number, fx: number, fy: number, duration = 1.1) {
      const x = Math.min(0, Math.max(W - W * scale, W / 2 - fx * scale));
      const y = Math.min(0, Math.max(H - H * scale, H / 2 - fy * scale));

      return to(camera, { scale, x, y, duration, ease: "power3.inOut" });
    }

    let buffer: string[] = [];
    const ps = '<span class="prm">deploy@web-01</span>:~$ ';

    function render(extra = "") {
      lines.innerHTML = buffer.join("\n") + (buffer.length ? "\n" : "") + extra;
    }

    function prompt() {
      render(`${ps}<span class="caret"></span>`);
    }

    async function type(text: string, speed = 15) {
      for (let index = 1; index <= text.length; index++) {
        render(`${ps}${text.slice(0, index)}<span class="caret"></span>`);
        await wait(speed + Math.random() * 12);
      }

      buffer.push(`${ps}${text}`);
      render();
    }

    async function print(list: readonly string[], gap = 60) {
      for (const line of list) {
        buffer.push(line);
        render();
        await wait(gap);
      }
    }

    async function progress(label: string, ms: number) {
      const steps = 28;
      buffer.push("");

      for (let index = 0; index <= steps; index++) {
        const done = "#".repeat(index);
        const left = ".".repeat(steps - index);
        buffer[buffer.length - 1] = `<span class="mut">${label}</span> [<span class="ok">${done}</span><span class="mut">${left}</span>] ${Math.round((index / steps) * 100)}%`;
        render();
        await wait(ms / steps);
      }
    }

    function reset() {
      gsap.set(camera, { scale: 1, x: 0, y: 0 });
      gsap.set(cursor, { x: 980, y: 720, scale: 1, opacity: 1 });
      gsap.set(terminal, { opacity: 0 });
      gsap.set(snippets, { clipPath: "inset(50px 1388px 8px 52px)" });
      gsap.set(toggle, { opacity: 0 });
      gsap.set(hover, { opacity: 0 });
      gsap.set(toast, { opacity: 0, y: 14 });
      buffer = [];
      prompt();
    }

    async function scene() {
      reset();
      await wait(500);
      await move(750, 507, 0.9);
      highlight(694, 493, 376, 28);
      await wait(120);
      await click();
      unhighlight();
      await to(terminal, { opacity: 1, duration: 0.25 });
      background(move(700, 420, 0.7));
      await zoom(1.7, 710, 230, 0.8);
      await type(demo.install.command);
      await print(demo.install.output);
      await progress(demo.install.progress, 700);
      await print(demo.install.after, 90);
      background(zoom(1.7, 710, 330, 0.5));
      await type(demo.firewall.command, 13);
      await print(demo.firewall.output, 100);
      await type(demo.certificate.command, 13);
      background(zoom(1.7, 710, 420, 0.5));
      await print(demo.certificate.output, 200);
      await wait(250);
      background(zoom(1, W / 2, H / 2, 0.8));
      await move(26, 162, 0.8);
      highlight(8, 144, 36, 36);
      await wait(80);
      await click();
      unhighlight();
      gsap.set(toggle, { opacity: 1 });
      await to(snippets, {
        clipPath: "inset(50px 1116px 8px 52px)",
        duration: 0.5,
        ease: "power3.out",
      });
      await wait(150);
      await move(180, 296, 0.6);
      highlight(66, 268, 244, 56);
      await wait(100);
      await click();
      unhighlight();
      background(zoom(1.5, 670, 460, 0.6));
      await type(demo.restart, 12);
      await type(demo.check.command, 12);
      buffer.push(demo.check.output);
      prompt();
      await wait(400);
      await zoom(1, W / 2, H / 2, 0.7);
      await to(toast, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.6)",
      });
      await to(cursor, {
        x: 1400,
        y: 880,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      });
      await wait(1800);
    }

    async function loop() {
      try {
        while (alive) {
          await scene();
        }
      } catch (error) {
        if (error !== stopped) {
          throw error;
        }
      }
    }

    loop();

    return () => {
      alive = false;
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} role="img" aria-label={t("hero.demo.label")} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      <div data-part="stage" className="absolute top-0 left-0 h-[900px] w-[1440px] origin-top-left opacity-0">
        <div data-part="camera" className="absolute inset-0 origin-top-left overflow-hidden will-change-transform">
          <Image src={asset(demo.frames.welcome)} alt="" width={W} height={H} priority className="absolute inset-0 h-[900px] w-[1440px] max-w-none" />
          <div data-part="terminal" className="absolute inset-0 opacity-0">
            <Image src={asset(demo.frames.terminal)} alt="" width={W} height={H} className="absolute inset-0 h-[900px] w-[1440px] max-w-none" />
            <div className="absolute top-[56px] left-[334px] h-[800px] w-[1094px] bg-[#15171b]" />
            <div data-part="lines" className="demo-lines absolute top-[63px] left-[344px] w-[1076px] text-left" />
          </div>
          <Image data-part="snippets" src={asset(demo.frames.snippets)} alt="" width={W} height={H} className="absolute inset-0 h-[900px] w-[1440px] max-w-none [clip-path:inset(50px_1388px_8px_52px)]" />
          <Image data-part="toggle" src={asset(demo.frames.snippets)} alt="" width={W} height={H} className="absolute inset-0 h-[900px] w-[1440px] max-w-none opacity-0 [clip-path:inset(144px_1396px_720px_8px)]" />
          <div data-part="hover" className="pointer-events-none absolute rounded-[7px] bg-white/[0.07] opacity-0" />
          <div data-part="ripple" className="pointer-events-none absolute -mt-5 -ml-5 size-10 rounded-full border-2 border-aurora opacity-0" />
          <svg data-part="cursor" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-30 size-[26px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M4 2.5v17.2l4.6-4.4 3 6.8 3.1-1.4-3-6.6h6.3z" fill="#fff" stroke="#050d0a" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div
        data-part="toast"
        className="absolute bottom-[7%] left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-left whitespace-nowrap text-text opacity-0 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6)]"
      >
        <span className="grid size-6 place-items-center rounded-full bg-aurora text-[13px] font-bold text-night">✓</span>
        <span>
          <b className="block text-[14px] font-semibold">{t("hero.demo.toastTitle")}</b>
          <small className="block text-[12.5px] text-muted">{t("hero.demo.toastBody")}</small>
        </span>
      </div>
    </div>
  );
}
