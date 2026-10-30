import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductPage } from "@/components/products/ProductPage";
import { t } from "@/i18n/t";
import { findProduct, products } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${t(`products.${slug}.name`)} · ${t("brand")}`,
    description: t(`products.${slug}.body`),
  };
}

export default async function Product({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ProductPage product={product} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
