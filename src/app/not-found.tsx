import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Band } from "@/components/layout/Band";
import { ButtonLink, Mark } from "@/components/ui";
import { t } from "@/i18n/t";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Band tone="night" guides={[]} className="isolate overflow-hidden">
          <div className="aurora-css -z-10 opacity-60" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="flex min-h-[78svh] flex-col items-center justify-center px-6 pt-32 pb-24 text-center md:px-8">
            <Mark className="flicker-line size-12 text-aurora" />
            <p className="mt-10 font-mono text-[clamp(72px,14vw,180px)] leading-none font-medium tracking-[-0.06em] text-white/90">{t("notFound.code")}</p>
            <h1 className="mt-6 text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-0.035em]">{t("notFound.title")}</h1>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-night-muted">{t("notFound.body")}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/">{t("notFound.home")}</ButtonLink>
              <ButtonLink href="/#contact" variant="glass">
                {t("notFound.contact")}
              </ButtonLink>
            </div>
          </div>
        </Band>
      </main>
      <Footer />
    </>
  );
}
