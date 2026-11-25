import { shop } from "@/lib/data";

export function DemoMark() {
  return (
    <div className="pointer-events-none fixed top-4 left-4 z-50 md:top-6 md:left-6">
      <p className="rounded-full border border-current/15 bg-white/45 px-3 py-1 font-sans text-[10px] font-medium tracking-[0.14em] text-current uppercase backdrop-blur-md md:text-[11px]">
        Demo · TanVo Studio
      </p>
      <span className="sr-only">{shop.demoNote}</span>
    </div>
  );
}
