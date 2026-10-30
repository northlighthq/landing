# Northlight — landing

Landing site for Northlight, built with Next.js (App Router), React 19, TypeScript and Tailwind v4.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Structure

```
src/
  app/            routes (home, products/[slug], not-found)
  components/
    bits/         vendored ReactBits effects
    landing/      home page sections
    layout/       header, footer, global chrome
    products/     product pages
    ui/           shared primitives
  i18n/           messages and t()
  lib/            helpers, site and product data
public/           static assets
```
