import { en } from "@/i18n/messages/en";
import { site } from "@/lib/site";

type Vars = Record<string, string | number>;

function lookup(key: string): unknown {
  return key.split(".").reduce<unknown>((node, part) => {
    if (node === null || typeof node !== "object") {
      return undefined;
    }

    return (node as Record<string, unknown>)[part];
  }, en);
}

function fill(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => String(vars[name] ?? match));
}

export function t(key: string, vars: Vars = {}): string {
  const value = lookup(key);

  if (typeof value !== "string") {
    return key;
  }

  return fill(value, { product: site.product, ...vars });
}

export function tList<T>(key: string): readonly T[] {
  const value = lookup(key);

  if (!Array.isArray(value)) {
    return [];
  }

  return value as readonly T[];
}
