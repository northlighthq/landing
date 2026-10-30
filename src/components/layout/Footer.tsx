import Link from "next/link";
import { BackToTop } from "@/components/layout/BackToTop";
import { Band } from "@/components/layout/Band";
import { Logo, Mark } from "@/components/ui";
import { t } from "@/i18n/t";
import { site } from "@/lib/site";

export function Footer() {
  const columns = [
    {
      title: t("footer.studio"),
      links: [
        { label: t("nav.services"), href: "/#services" },
        { label: t("nav.process"), href: "/#process" },
        { label: t("nav.principles"), href: "/#principles" },
        { label: t("nav.contact"), href: "/#contact" },
      ],
    },
    {
      title: t("footer.products"),
      links: [
        { label: site.product, href: "/products/boreal" },
        { label: t("footer.releases"), href: site.releases },
      ],
    },
    {
      title: t("footer.project"),
      links: [
        { label: t("nav.github"), href: site.github },
        { label: t("footer.brand"), href: site.brand },
        { label: t("footer.bugs"), href: site.issues },
      ],
    },
  ];

  return (
    <footer>
      <Band>
        <div className="grid sm:grid-cols-2 md:grid-cols-4">
          <div className="grid content-start gap-4 p-6 md:p-8">
            <Logo />
            <p className="max-w-[26ch] text-[15px] leading-relaxed text-muted">{t("footer.tagline")}</p>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="grid content-start gap-4 p-6 md:p-8">
              <h4 className="text-sm font-medium">{column.title}</h4>
              <ul className="grid gap-2.5 text-[15px] text-muted">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-text">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Band>
      <Band tone="night" guides={[]} className="overflow-hidden">
        <div className="relative isolate flex flex-col gap-10 px-6 pt-16 pb-8 md:px-8">
          <div className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full bg-aurora/10 blur-[110px]" aria-hidden="true" />
          <div className="flex items-center justify-center gap-[0.32em] text-[clamp(56px,13vw,184px)] leading-none font-medium tracking-[-0.06em]">
            <Mark className="size-[0.82em] shrink-0 text-aurora" />
            <span>{t("brand")}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-night-muted">
            <span>{t("footer.copyright", { year: 2026 })}</span>
            <BackToTop label={t("footer.top")} />
          </div>
        </div>
      </Band>
    </footer>
  );
}
