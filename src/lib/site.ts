export const site = {
  product: "Boreal",
  contact: "https://github.com/northlighthq",
  github: "https://github.com/northlighthq",
  repo: "https://github.com/northlighthq/boreal",
  download: "https://github.com/northlighthq/boreal/releases/latest",
  releases: "https://github.com/northlighthq/boreal/releases",
  issues: "https://github.com/northlighthq/boreal/issues",
  brand: "https://github.com/northlighthq/branding",
  libs: {
    vt: "https://github.com/northlighthq/vt",
    pty: "https://github.com/northlighthq/pty",
    glyphs: "https://github.com/northlighthq/glyphs",
  },
} as const;

export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
