"use client";

import type { BuildStep } from "@/lib/data";
import { shop } from "@/lib/data";
import { motion, useTransform, type MotionValue } from "motion/react";

export function StepCopy({
  step,
  progress,
  nextAt,
}: {
  step: BuildStep;
  progress: MotionValue<number>;
  nextAt: number;
}) {
  const isHero = step.id === "hero";
  const isFirst = step.at === 0;
  const fadeInStart = isFirst ? 0 : Math.max(0, step.at - 0.04);
  const fadeInEnd = isFirst ? 0 : step.at + 0.015;
  const fadeOutStart = nextAt - 0.04;
  const fadeOutEnd = Math.min(1, nextAt + 0.015);

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [isFirst ? 1 : 0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [isFirst ? 0 : 18, 0, 0, -18],
  );

  const side =
    step.align === "center"
      ? "mx-auto items-center text-center"
      : step.align === "right"
        ? "md:ml-auto md:mr-36 md:items-end md:text-right items-start text-left"
        : "md:ml-[8%] md:mr-auto items-start text-left";

  const vertical = isHero
    ? "items-start justify-center pt-[min(12vh,6rem)] md:items-end md:pt-0 md:pb-20"
    : "items-end justify-center pb-20 md:items-center md:pb-0";

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 flex ${vertical}`}
      style={{ opacity, y }}
    >
      <div className={`flex w-full max-w-[22rem] flex-col gap-3 px-6 md:max-w-[26rem] md:px-0 ${side}`}>
        <p
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: step.muted }}
        >
          {step.eyebrow}
        </p>
        <h1
          className={
            isHero
              ? "font-serif text-[18vw] leading-[0.8] font-medium tracking-[-0.04em] sm:text-8xl md:text-9xl"
              : "font-serif text-[2.35rem] leading-[0.95] font-medium tracking-[-0.03em] sm:text-5xl md:text-6xl"
          }
          style={{ color: step.color }}
        >
          {step.title}
        </h1>
        <p
          className={`max-w-sm font-sans text-base leading-relaxed md:text-lg ${isHero ? "mt-2" : ""}`}
          style={{ color: step.muted }}
        >
          {isHero ? (
            <>
              {step.body}
              <span className="mt-4 block text-sm tracking-wide opacity-80">
                {shop.hint}
              </span>
            </>
          ) : (
            step.body
          )}
        </p>
        {step.cta && (
          <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-[#F4EFE4] px-6 py-3 font-sans text-sm font-medium tracking-wide text-[#172116] transition-transform hover:scale-[1.03]"
            >
              {step.cta}
            </a>
            {step.price && (
              <span
                className="font-serif text-2xl tracking-wide"
                style={{ color: step.color }}
              >
                {step.price}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
