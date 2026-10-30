import Image from "next/image";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";

export function Wallpaper({ src, className, priority = false }: { src: string; className?: string; priority?: boolean }) {
  return <Image src={asset(src)} alt="" fill priority={priority} sizes="(max-width: 768px) 100vw, 1320px" className={cn("-z-10 object-cover", className)} />;
}
