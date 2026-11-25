"use client";

import { usePageProgress } from "@/components/useLenisProgress";
import { useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function ProgressBadge() {
  const scrollYProgress = usePageProgress();
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setPercent(Math.round(value * 100));
  });

  return (
    <div
      className="pointer-events-none fixed right-3 z-50 flex flex-col items-center top-[58%] -translate-y-0 md:top-1/2 md:right-6 md:-translate-y-1/2"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3 rounded-full bg-[#1c2b1a]/35 px-2 py-4 text-[#F4EFE4] shadow-sm backdrop-blur-md md:px-2.5 md:py-5">
        <span className="block h-8 w-px bg-current/40 md:h-12" />
        <p className="font-serif text-sm tracking-[0.18em] tabular-nums md:text-base">
          {String(percent).padStart(2, "0")}%
        </p>
        <span className="block h-8 w-px bg-current/40 md:h-12" />
      </div>
    </div>
  );
}
