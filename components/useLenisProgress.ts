"use client";

import { useLenis } from "lenis/react";
import { useMotionValue, type MotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

/** Page-level progress (0–1), driven by Lenis so it stays in sync with smooth scroll. */
export function usePageProgress(): MotionValue<number> {
  const progress = useMotionValue(0);

  useLenis(({ scroll, limit }) => {
    progress.set(limit > 0 ? scroll / limit : 0);
  });

  useEffect(() => {
    const root = document.scrollingElement || document.documentElement;
    const max = root.scrollHeight - window.innerHeight;
    progress.set(max > 0 ? root.scrollTop / max : 0);
  }, [progress]);

  return progress;
}

/**
 * Progress of a sticky build container: 0 when its top hits the viewport top,
 * 1 when its bottom hits the viewport bottom.
 */
export function useContainerProgress(
  containerRef: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);

  const measure = (scroll: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.offsetTop;
    const end = top + el.offsetHeight - window.innerHeight;
    const span = end - top;
    if (span <= 0) {
      progress.set(0);
      return;
    }
    const next = Math.min(1, Math.max(0, (scroll - top) / span));
    progress.set(next);
  };

  useLenis(({ scroll }) => {
    measure(scroll);
  });

  useEffect(() => {
    const root = document.scrollingElement || document.documentElement;
    measure(root.scrollTop);
    const onResize = () => measure(root.scrollTop);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure closes over the ref
  }, [progress]);

  return progress;
}
