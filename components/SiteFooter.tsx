import { shop } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative z-20 bg-[#101510] px-6 py-16 text-[#F4EFE4] md:px-16 md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">
            {shop.name}
          </p>
          <p className="mt-4 max-w-sm font-sans text-base text-[#C5CDB8]">
            {shop.footerLine}
          </p>
          <a
            href="#menu"
            className="mt-6 inline-flex items-center rounded-full bg-[#F4EFE4] px-6 py-3 font-sans text-sm font-medium text-[#101510] transition-transform hover:scale-[1.03]"
          >
            {shop.orderCta}
          </a>
        </div>
        <div className="space-y-2 font-sans text-sm leading-relaxed text-[#C5CDB8]">
          <p>{shop.address}</p>
          <p>{shop.hours}</p>
          <p>{shop.phone}</p>
          <p>{shop.instagram}</p>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-3xl font-sans text-xs tracking-wide text-[#C5CDB8]/70">
        {shop.demoNote}
      </p>
    </footer>
  );
}
