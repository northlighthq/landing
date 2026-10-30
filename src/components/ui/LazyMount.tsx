"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function LazyMount({ children, className, margin = "200px" }: { children: ReactNode; className?: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      function onChange(entries) {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
