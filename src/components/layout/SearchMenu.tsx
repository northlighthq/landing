"use client";

import { Command } from "cmdk";
import { ArrowUpRight, FileText, Search, Server, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { t, tList } from "@/i18n/t";
import { site } from "@/lib/site";

const item = "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-muted data-[selected=true]:bg-bg-soft data-[selected=true]:text-text";

const heading = "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase";

export function SearchMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const services = tList<{ key: string; title: string }>("services.items");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string) {
    setOpen(false);

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener");

      return;
    }

    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("nav.search")}
        className="hidden h-9 items-center gap-2 rounded-full px-3 text-night-muted transition-colors hover:bg-white/10 hover:text-night-text sm:inline-flex"
      >
        <Search className="size-4" />
        <kbd className="hidden rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10.5px] text-night-muted lg:inline">{t("nav.shortcut")}</kbd>
      </button>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t("nav.search")}
        overlayClassName="fixed inset-0 z-[60] bg-night/40 backdrop-blur-sm"
        contentClassName="fixed top-[18vh] left-1/2 z-[70] w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface shadow-nav"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 text-faint" />
          <Command.Input placeholder={t("nav.searchPlaceholder")} className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-faint" />
        </div>
        <Command.List className={`max-h-[360px] overflow-y-auto p-2 ${heading}`}>
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted">{t("nav.searchEmpty")}</Command.Empty>
          <Command.Group heading={t("nav.groups.pages")}>
            {[
              { label: t("nav.services"), href: "/#services" },
              { label: t("nav.process"), href: "/#process" },
              { label: t("nav.principles"), href: "/#principles" },
              { label: t("nav.contact"), href: "/#contact" },
            ].map((page) => (
              <Command.Item key={page.href} onSelect={() => go(page.href)} className={item}>
                <FileText className="size-4" />
                {page.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading={t("nav.groups.services")}>
            {services.map((service) => (
              <Command.Item key={service.key} onSelect={() => go("/#services")} className={item}>
                <Server className="size-4" />
                {service.title}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading={t("nav.groups.products")}>
            <Command.Item onSelect={() => go("/products/boreal")} className={item}>
              <Terminal className="size-4" />
              {site.product}
            </Command.Item>
          </Command.Group>
          <Command.Group heading={t("nav.groups.links")}>
            <Command.Item onSelect={() => go(site.github)} className={item}>
              <ArrowUpRight className="size-4" />
              {t("nav.github")}
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
