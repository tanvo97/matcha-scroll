"use client";

import { iceCubes, layerTimings, pearls } from "@/lib/data";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useId } from "react";

const INNER_TOP = 108;
const INNER_BOTTOM = 424;
const TAPER = 26;
const INNER_LEFT = 66;
const INNER_RIGHT = 214;
const MILK_TOP_Y = 248;
const MATCHA_TOP_Y = 190;
const FOAM_TOP_Y = 158;

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function widthAt(y: number): number {
  const t = (y - INNER_TOP) / (INNER_BOTTOM - INNER_TOP);
  return INNER_RIGHT - TAPER * t - (INNER_LEFT + TAPER * t);
}

function rxAt(y: number): number {
  return widthAt(y) / 2;
}

export function MatchaGlass({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const drive = useMotionValue(0);

  useMotionValueEvent(progress, "change", (value) => {
    if (!reduced) drive.set(value);
  });

  useEffect(() => {
    if (reduced) drive.set(1);
    else drive.set(progress.get());
  }, [reduced, drive, progress]);

  const glassOpacity = useTransform(drive, [0, 0.06], [0.55, 1]);
  const glassY = useTransform(drive, [0, 0.08], [18, 0]);

  const iceOpacity = useTransform(drive, [...layerTimings.ice.range], [0, 1]);
  const iceY = useTransform(drive, [...layerTimings.ice.range], [-28, 0], {
    ease: easeOutCubic,
  });

  const milkTop = useTransform(
    drive,
    [...layerTimings.milkFill.range],
    [INNER_BOTTOM, MILK_TOP_Y],
    { ease: easeOutCubic },
  );
  const milkRx = useTransform(milkTop, (y) => rxAt(y));
  const milkOpacity = useTransform(
    drive,
    [layerTimings.milkFill.range[0], layerTimings.milkFill.range[0] + 0.04],
    [0, 1],
  );
  const milkStreamOpacity = useTransform(
    drive,
    [
      layerTimings.milkStream.range[0],
      layerTimings.milkStream.range[0] + 0.03,
      layerTimings.milkStream.range[1] - 0.025,
      layerTimings.milkStream.range[1],
    ],
    [0, 1, 0.85, 0],
  );

  const matchaTop = useTransform(
    drive,
    [...layerTimings.matchaFill.range],
    [MILK_TOP_Y, MATCHA_TOP_Y],
    { ease: easeOutCubic },
  );
  const matchaRx = useTransform(matchaTop, (y) => rxAt(y));
  const matchaHeight = useTransform(matchaTop, (y) => MILK_TOP_Y + 10 - y);
  const matchaOpacity = useTransform(
    drive,
    [layerTimings.matchaFill.range[0], layerTimings.matchaFill.range[0] + 0.04],
    [0, 1],
  );
  const matchaStreamOpacity = useTransform(
    drive,
    [
      layerTimings.matchaStream.range[0],
      layerTimings.matchaStream.range[0] + 0.025,
      layerTimings.matchaStream.range[1] - 0.02,
      layerTimings.matchaStream.range[1],
    ],
    [0, 1, 0.8, 0],
  );

  const foamTop = useTransform(
    drive,
    [...layerTimings.foam.range],
    [MATCHA_TOP_Y, FOAM_TOP_Y],
    { ease: easeOutBack },
  );
  const foamRx = useTransform(foamTop, (y) => rxAt(y) + 2);
  const foamHeight = useTransform(foamTop, (y) => MATCHA_TOP_Y + 12 - y);
  const foamOpacity = useTransform(
    drive,
    [layerTimings.foam.range[0], layerTimings.foam.range[0] + 0.05],
    [0, 1],
  );
  const foamScale = useTransform(drive, [...layerTimings.foam.range], [0.7, 1], {
    ease: easeOutBack,
  });

  const strawY = useTransform(drive, [...layerTimings.straw.range], [-80, 0], {
    ease: easeOutCubic,
  });
  const strawOpacity = useTransform(drive, [...layerTimings.straw.range], [0, 1]);
  const foamBlobY = useTransform(foamTop, (y) => y + 6);
  const foamBlobY2 = useTransform(foamTop, (y) => y + 8);

  const clipId = `mg-clip-${uid}`;
  const clipDeepId = `mg-clip-deep-${uid}`;

  return (
    <motion.svg
      viewBox="0 0 280 520"
      className="h-auto w-full overflow-visible"
      style={{ opacity: glassOpacity, y: glassY }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`mg-glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="22%" stopColor="#d5ebe3" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#f4efe4" stopOpacity="0.06" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`mg-milk-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8EA" />
          <stop offset="45%" stopColor="#F3E1BE" />
          <stop offset="100%" stopColor="#D9BA86" />
        </linearGradient>
        <linearGradient id={`mg-matcha-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C5DE6A" />
          <stop offset="28%" stopColor="#7DAA3A" />
          <stop offset="72%" stopColor="#4A7424" />
          <stop offset="100%" stopColor="#2A4A16" />
        </linearGradient>
        <linearGradient id={`mg-foam-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6D8" />
          <stop offset="55%" stopColor="#F0D48A" />
          <stop offset="100%" stopColor="#D9B45C" />
        </linearGradient>
        <linearGradient id={`mg-ice-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#D7EEF3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B9D4DD" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id={`mg-pearl-${uid}`} cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#8A5A32" />
          <stop offset="55%" stopColor="#4A2C16" />
          <stop offset="100%" stopColor="#24140C" />
        </radialGradient>
        <linearGradient id={`mg-straw-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F6EFD8" />
          <stop offset="40%" stopColor="#FFFDF4" />
          <stop offset="100%" stopColor="#E7D7A8" />
        </linearGradient>
        <linearGradient id={`mg-highlight-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
        <filter
          id={`mg-shadow-${uid}`}
          x="-30%"
          y="-10%"
          width="160%"
          height="130%"
        >
          <feGaussianBlur stdDeviation="10" result="b" />
          <feOffset dy="8" />
          <feColorMatrix values="0 0 0 0 0.08  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0.35 0" />
        </filter>
        <clipPath id={clipId}>
          <path d="M 66 108 L 214 108 L 188 424 Q 140 444 92 424 Z" />
        </clipPath>
        <clipPath id={clipDeepId}>
          <path d="M 54 20 L 226 20 L 226 108 L 214 108 L 188 424 Q 140 444 92 424 L 66 108 L 54 108 Z" />
        </clipPath>
      </defs>

      <ellipse
        cx="140"
        cy="478"
        rx="92"
        ry="16"
        fill="#0f1a10"
        opacity="0.18"
        filter={`url(#mg-shadow-${uid})`}
      />

      {/* Back of the glass */}
      <path
        d="M 54 108 L 84 428 C 90 448 190 448 196 428 L 226 108"
        fill={`url(#mg-glass-${uid})`}
        stroke="#8aa090"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      <path
        d="M 54 108 A 86 22 0 0 1 226 108"
        fill="none"
        stroke="#c5d0c8"
        strokeOpacity="0.95"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Short pours from just above the rim, not a line through the whole glass */}
      <g clipPath={`url(#${clipDeepId})`}>
        <motion.path
          d="M 136 84 C 134 108 134 132 137 168 L 147 168 C 148 132 148 108 144 84 Z"
          fill="#F6E6C0"
          style={{ opacity: milkStreamOpacity }}
        />
        <motion.path
          d="M 148 84 C 146 108 147 128 150 158 L 158 158 C 158 128 158 108 156 84 Z"
          fill="#7DAA3A"
          style={{ opacity: matchaStreamOpacity }}
        />
      </g>

      <g clipPath={`url(#${clipId})`}>
        <motion.g style={{ opacity: iceOpacity, y: iceY }}>
          {iceCubes.map((cube, index) => (
            <g
              key={index}
              className={reduced ? undefined : "ice-float"}
              style={{ animationDelay: cube.delay }}
            >
              <g transform={`translate(${cube.x} ${cube.y}) rotate(${cube.rotate})`}>
                <rect
                  x={-cube.w / 2}
                  y={-cube.h / 2}
                  width={cube.w}
                  height={cube.h}
                  rx="7"
                  fill={`url(#mg-ice-${uid})`}
                  stroke="#ffffff"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                />
                <path
                  d={`M ${-cube.w / 2 + 6} ${-cube.h / 2 + 8} L ${-cube.w / 2 + 14} ${-cube.h / 2 + 5}`}
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </g>
            </g>
          ))}
        </motion.g>

        <motion.rect
          x="40"
          width="200"
          height="400"
          y={milkTop}
          fill={`url(#mg-milk-${uid})`}
          style={{ opacity: milkOpacity }}
          fillOpacity="0.88"
        />
        <motion.ellipse
          cx="140"
          cy={milkTop}
          rx={milkRx}
          ry="12"
          fill="#FFF9EC"
          style={{ opacity: milkOpacity }}
        />

        <motion.rect
          x="40"
          width="200"
          y={matchaTop}
          height={matchaHeight}
          fill={`url(#mg-matcha-${uid})`}
          style={{ opacity: matchaOpacity }}
        />
        <motion.ellipse
          cx="140"
          cy={matchaTop}
          rx={matchaRx}
          ry="13"
          fill="#D4E86A"
          style={{ opacity: matchaOpacity }}
        />
        <motion.ellipse
          cx="140"
          cy={MILK_TOP_Y}
          rx={milkRx}
          ry="8"
          fill="#3D5C20"
          fillOpacity="0.18"
          style={{ opacity: matchaOpacity }}
        />
        <motion.ellipse
          cx="140"
          cy={matchaTop}
          rx={matchaRx}
          ry="6"
          fill="#F3F8D4"
          fillOpacity="0.35"
          style={{ opacity: matchaOpacity }}
        />

        <motion.g
          style={{
            opacity: foamOpacity,
            scale: foamScale,
            transformOrigin: "140px 190px",
          }}
        >
          <motion.rect
            x="40"
            width="200"
            y={foamTop}
            height={foamHeight}
            fill={`url(#mg-foam-${uid})`}
          />
          <motion.ellipse
            cx="140"
            cy={foamTop}
            rx={foamRx}
            ry="14"
            fill="#FFF8D9"
          />
          <motion.ellipse
            cx="118"
            cy={foamBlobY}
            rx="18"
            ry="9"
            fill="#FFE9A8"
            opacity="0.8"
          />
          <motion.ellipse
            cx="168"
            cy={foamBlobY2}
            rx="16"
            ry="8"
            fill="#FFF6D0"
            opacity="0.9"
          />
        </motion.g>

        {pearls.map((pearl, index) => (
          <Pearl
            key={index}
            progress={drive}
            pearl={pearl}
            gradientId={`mg-pearl-${uid}`}
          />
        ))}
      </g>

      {/* Front glass lip and highlights */}
      <path
        d="M 54 108 L 84 428 C 90 448 190 448 196 428 L 226 108"
        fill="none"
        stroke="#7e8f82"
        strokeOpacity="0.55"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M 54 108 A 86 22 0 0 0 226 108"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 54 108 A 86 22 0 0 0 226 108"
        fill="none"
        stroke="#e8d9b0"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 200 128 C 214 180 210 300 192 400"
        fill="none"
        stroke={`url(#mg-highlight-${uid})`}
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 70 140 C 64 220 70 320 86 400"
        fill="none"
        stroke="#1c2b1a"
        strokeOpacity="0.08"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <motion.g style={{ y: strawY, opacity: strawOpacity }}>
        <g transform="translate(168 24) rotate(18)">
          <rect
            x="-7"
            y="0"
            width="14"
            height="268"
            rx="7"
            fill={`url(#mg-straw-${uid})`}
          />
          <rect x="-3.5" y="0" width="2" height="268" fill="#7DAA3A" opacity="0.55" />
          <rect x="1.5" y="0" width="2" height="268" fill="#7DAA3A" opacity="0.4" />
          <ellipse cx="0" cy="2" rx="7" ry="3.2" fill="#FFFDF6" />
        </g>
      </motion.g>
    </motion.svg>
  );
}

function Pearl({
  progress,
  pearl,
  gradientId,
}: {
  progress: MotionValue<number>;
  pearl: (typeof pearls)[number];
  gradientId: string;
}) {
  const start = layerTimings.pearls.range[0] + pearl.shift;
  const end = Math.min(layerTimings.pearls.range[1] + pearl.shift * 0.25, 0.88);
  const y = useTransform(progress, [start, end], [36, pearl.restY], {
    ease: easeOutBack,
  });
  const opacity = useTransform(progress, [start, start + 0.045], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.7, 1], {
    ease: easeOutBack,
  });

  return (
    <motion.g style={{ y, opacity, scale, transformOrigin: `${pearl.cx}px ${pearl.restY}px` }}>
      <circle
        cx={pearl.cx}
        cy="0"
        r={pearl.r}
        fill={`url(#${gradientId})`}
      />
      <circle
        cx={pearl.cx - pearl.r * 0.32}
        cy={-pearl.r * 0.32}
        r={pearl.r * 0.28}
        fill="#C4894A"
        opacity="0.7"
      />
      <circle
        cx={pearl.cx - pearl.r * 0.22}
        cy={-pearl.r * 0.4}
        r={pearl.r * 0.14}
        fill="#FFF3D6"
        opacity="0.8"
      />
    </motion.g>
  );
}
