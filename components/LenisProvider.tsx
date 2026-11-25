"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type WindowWithLenis = Window & { __lenis?: LenisRef["lenis"] };

export function LenisProvider({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const instance = ref.current?.lenis;
    if (!instance) return;
    (window as WindowWithLenis).__lenis = instance;
    return () => {
      const current = (window as WindowWithLenis).__lenis;
      if (current === instance) {
        delete (window as WindowWithLenis).__lenis;
      }
    };
  }, [reduceMotion]);

  return (
    <ReactLenis
      root
      ref={ref}
      options={{
        autoRaf: true,
        lerp: reduceMotion ? 1 : 0.09,
        duration: reduceMotion ? 0 : 1.15,
        smoothWheel: !reduceMotion,
        // Instant scroll helps screenshot/recording scripts land on a frame.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
