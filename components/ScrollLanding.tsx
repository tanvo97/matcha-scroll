"use client";

import { BuildStage } from "@/components/BuildStage";
import { DemoMark } from "@/components/DemoMark";
import { MenuSection } from "@/components/MenuSection";
import { ProgressBadge } from "@/components/ProgressBadge";
import { SiteFooter } from "@/components/SiteFooter";

export function ScrollLanding() {
  return (
    <main className="relative">
      <DemoMark />
      <ProgressBadge />
      <BuildStage />
      <MenuSection />
      <SiteFooter />
    </main>
  );
}
