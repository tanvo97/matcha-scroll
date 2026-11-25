"use client";

import { MatchaGlass } from "@/components/MatchaGlass";
import { StepCopy } from "@/components/StepCopy";
import { useContainerProgress } from "@/components/useLenisProgress";
import { backgroundStops, backgroundTimes, steps } from "@/lib/data";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";

export function BuildStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollYProgress = useContainerProgress(containerRef);

  const backgroundColor = useTransform(
    scrollYProgress,
    backgroundTimes,
    backgroundStops,
  );

  return (
    <div ref={containerRef} data-build-stage className="relative">
      <div className="sticky top-0 z-10 h-dvh w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ backgroundColor }} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[min(58vw,280px)] -translate-y-10 md:w-[340px] md:translate-y-0">
            <MatchaGlass progress={scrollYProgress} reduced={reduced} />
          </div>
        </div>
        {steps.map((step, index) => (
          <StepCopy
            key={step.id}
            step={step}
            progress={scrollYProgress}
            nextAt={index < steps.length - 1 ? steps[index + 1].at : 1}
          />
        ))}
      </div>

      <div className="relative -mt-[100dvh]">
        {steps.map((step) => (
          <section
            key={step.id}
            data-step={step.id}
            className="h-dvh"
            aria-hidden="true"
          />
        ))}
        {/* Extra viewport so the finished drink and CTA hold before the stage unsticks. */}
        <div className="h-dvh" aria-hidden="true" />
      </div>
    </div>
  );
}
