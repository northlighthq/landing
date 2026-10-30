export type Product = {
  slug: string;
  logo: string;
  shot: string;
  wallpaper: string;
  download: string;
  source: string;
};

export const products: Product[] = [
  {
    slug: "boreal",
    logo: "/products/boreal.svg",
    shot: "/screens/terminal.png",
    wallpaper: "/backgrounds/highlands.jpg",
    download: "https://github.com/northlighthq/boreal/releases/latest",
    source: "https://github.com/northlighthq/boreal",
  },
];

export function findProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
