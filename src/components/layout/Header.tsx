"use client";

import { Activity, ArrowLeftRight, ChevronDown, Code, DatabaseBackup, Download, History, Menu, Palette, ScanSearch, Server, ShieldCheck, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchMenu } from "@/components/layout/SearchMenu";
import { ArrowIcon, Logo, Mark, Wallpaper } from "@/components/ui";
import { NavMenu, NavMenuContent, NavMenuItem, NavMenuLink, NavMenuList, NavMenuTrigger, NavMenuViewport } from "@/components/ui/NavMenu";
import { t, tList } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";

const mobileLinks = [
  { href: "/#services", key: "nav.services" },
  { href: "/products/boreal", key: "nav.products" },
  { href: "/#process", key: "nav.process" },
  { href: "/#contact", key: "nav.contact" },
] as const;

const trigger = "flex h-9 items-center gap-1 rounded-full px-3 text-sm text-night-muted transition-colors hover:bg-white/10 hover:text-night-text data-[state=open]:bg-white/10 data-[state=open]:text-night-text";

const serviceIcons: Record<string, LucideIcon> = {
  setup: ShieldCheck,
  monitoring: Activity,
  backups: DatabaseBackup,
  migrations: ArrowLeftRight,
  managed: Server,
  audits: ScanSearch,
};

const productIcons: Record<string, LucideIcon> = {
  download: Download,
  releases: History,
  source: Code,
  brand: Palette,
};

const featured = "group/card relative flex h-full min-h-48 flex-col overflow-hidden rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]";

const row = "group/row flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.05] focus-visible:bg-white/[0.05]";

function MenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="mt-0.5 size-[18px] shrink-0 text-night-muted transition-colors duration-200 group-hover/row:text-aurora" strokeWidth={1.7} />;
}

function MenuRow({ href, icon, image, title, body }: { href: string; icon?: LucideIcon; image?: string; title: string; body: string }) {
  return (
    <li>
      <NavMenuLink asChild>
        <Link href={href} className={row}>
          {image ? <Image src={asset(image)} alt="" width={28} height={28} className="mt-0.5 size-7 shrink-0" /> : <MenuIcon icon={icon ?? Server} />}
          <span className="grid min-w-0 flex-1 gap-0.5">
            <span className="text-[14px] font-medium text-night-text">{title}</span>
            <span className="line-clamp-2 text-[12.5px] leading-snug text-night-muted">{body}</span>
          </span>
          <ArrowIcon className="mt-1 size-3.5 shrink-0 -translate-x-1 text-night-muted opacity-0 transition-all duration-200 group-hover/row:translate-x-0 group-hover/row:text-aurora group-hover/row:opacity-100" />
        </Link>
      </NavMenuLink>
    </li>
  );
}

function ServicesMenu() {
  const items = tList<{ key: string; title: string; body: string }>("services.items");

  return (
    <div className="grid gap-3 p-3 md:grid-cols-[240px_1fr]">
      <NavMenuLink asChild>
        <Link href="/#contact" className={featured}>
          <span className="text-lg font-medium text-night-text">{t("nav.featured.title")}</span>
          <span className="mt-1 text-[13px] leading-snug text-night-muted">{t("nav.featured.body")}</span>
          <Mark className="absolute right-4 bottom-4 size-14 text-aurora opacity-30 transition-opacity duration-500 group-hover/card:opacity-70" />
          <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-aurora">
            {t("nav.contact")}
            <ArrowIcon className="size-3.5 transition-transform group-hover/card:translate-x-0.5" />
          </span>
        </Link>
      </NavMenuLink>
      <ul className="grid grid-cols-2 gap-1">
        {items.map((entry) => (
          <MenuRow key={entry.key} href="/#services" icon={serviceIcons[entry.key] ?? Server} title={entry.title} body={entry.body} />
        ))}
      </ul>
    </div>
  );
}

function ProductsMenu() {
  const products = tList<{ key: string; title: string; body: string; href: string; image: string; shot: string; wallpaper: string }>("nav.productList");
  const links = tList<{ key: string; title: string; body: string; href: string }>("nav.productLinks");

  return (
    <div className="grid gap-3 p-3 md:grid-cols-[1.35fr_1fr]">
      {products.map((product) => (
        <NavMenuLink key={product.key} asChild>
          <Link href={product.href} className={cn(featured, "min-h-64 p-0")}>
            <span className="relative z-10 flex items-center gap-3 p-4">
              <Image src={asset(product.image)} alt="" width={40} height={40} className="size-10" />
              <span className="grid gap-0.5">
                <span className="text-[16px] font-medium text-night-text">{product.title}</span>
                <span className="text-[12.5px] leading-snug text-night-muted">{product.body}</span>
              </span>
              <ArrowIcon className="ml-auto size-4 text-night-muted transition-all group-hover/card:translate-x-0.5 group-hover/card:text-aurora" />
            </span>
            <span className="relative isolate mx-4 mt-auto h-40 overflow-hidden rounded-t-lg">
              <Wallpaper src={product.wallpaper} />
              <Image src={asset(product.shot)} alt="" width={1440} height={900} className="absolute top-4 left-4 w-[150%] max-w-none rounded-md ring-1 ring-white/15 transition-transform duration-500 ease-out group-hover/card:-translate-y-1.5" />
            </span>
          </Link>
        </NavMenuLink>
      ))}
      <ul className="grid content-start gap-1">
        {links.map((entry) => (
          <MenuRow key={entry.key} href={entry.href} icon={productIcons[entry.key] ?? Code} title={entry.title} body={entry.body} />
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState("");

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 24);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  const floating = scrolled || open;
  const solid = floating || menu !== "";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 text-night-text transition-[padding] duration-300 ease-out", floating && "px-3 pt-3 md:px-4")}>
      <NavMenu delayDuration={80} value={menu} onValueChange={setMenu}>
        <div
          className={cn(
            "relative mx-auto transition-[max-width,border-radius] duration-300 ease-out",
            floating ? "max-w-[1080px] rounded-2xl ring-1 ring-white/10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)]" : "max-w-[1320px]",
            solid ? "bg-night/95 backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className={cn("grid grid-cols-[auto_1fr_auto] items-center transition-[height,padding] duration-300 md:grid-cols-[1fr_auto_1fr]", floating ? "h-14 px-4 md:px-5" : "h-[72px] px-6 md:px-8")}>
            <Link href="/" className="justify-self-start">
              <Logo markClassName="size-[0.8em]" />
            </Link>
            <NavMenuList className="hidden items-center gap-0.5 md:flex">
              <NavMenuItem value="services" className="relative">
                <NavMenuTrigger className={trigger}>
                  {t("nav.services")}
                  <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
                </NavMenuTrigger>
                <NavMenuContent>
                  <ServicesMenu />
                </NavMenuContent>
              </NavMenuItem>
              <NavMenuItem value="products" className="relative">
                <NavMenuTrigger className={trigger}>
                  {t("nav.products")}
                  <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
                </NavMenuTrigger>
                <NavMenuContent>
                  <ProductsMenu />
                </NavMenuContent>
              </NavMenuItem>
              <NavMenuItem>
                <NavMenuLink asChild>
                  <Link href="/#process" className={trigger}>
                    {t("nav.process")}
                  </Link>
                </NavMenuLink>
              </NavMenuItem>
              <NavMenuItem>
                <NavMenuLink asChild>
                  <Link href="/#principles" className={trigger}>
                    {t("nav.principles")}
                  </Link>
                </NavMenuLink>
              </NavMenuItem>
            </NavMenuList>
            <div className="flex items-center justify-end gap-1.5">
              <SearchMenu />
              <Link href="/#contact" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-night transition-colors hover:bg-aurora">
                {t("nav.contact")}
              </Link>
              <button
                type="button"
                aria-label={t("nav.menu")}
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="grid size-9 place-items-center rounded-full text-night-muted transition-colors hover:bg-white/10 hover:text-night-text md:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
          <NavMenuViewport className="hidden md:block" />
          {open ? (
            <div className="grid gap-1 border-t border-white/10 p-2 md:hidden">
              {mobileLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[15px] text-night-text hover:bg-white/10">
                  {t(link.key)}
                </Link>
              ))}
            </div>
          ) : null}
          <div className={cn("pointer-events-none absolute inset-0 transition-opacity duration-200", solid && "opacity-0")} aria-hidden="true">
            <span className="absolute inset-y-0 left-0 w-px bg-grid-night" />
            <span className="absolute inset-y-0 right-0 w-px bg-grid-night" />
          </div>
        </div>
        <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-200", solid && "opacity-0")} aria-hidden="true">
          <span className="flicker-line absolute inset-0 bg-grid-night" />
          <span className="flicker-sweep absolute inset-0" />
        </div>
      </NavMenu>
    </header>
  );
}
