import { menuItems, shop } from "@/lib/data";

export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative z-20 bg-[#EEF1E6] px-6 py-24 text-[#1C2B1A] md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] text-[#5A6354] uppercase">
          Thực đơn
        </p>
        <h2 className="mt-3 font-serif text-4xl leading-none font-medium tracking-[-0.03em] md:text-6xl">
          {shop.menuTitle}
        </h2>
        <p className="mt-4 max-w-md font-sans text-base text-[#5A6354]">
          {shop.menuLead}
        </p>
        <ul className="mt-14 divide-y divide-[#1C2B1A]/10">
          {menuItems.map((item) => (
            <li key={item.name} className="py-6 first:pt-0">
              <div className="flex items-baseline gap-4">
                <h3 className="font-serif text-2xl tracking-[-0.02em] md:text-3xl">
                  {item.name}
                </h3>
                <span
                  className="h-px min-w-8 flex-1 border-b border-dotted border-[#1C2B1A]/30"
                  aria-hidden="true"
                />
                <p className="font-serif text-xl md:text-2xl">{item.price}</p>
              </div>
              <p className="mt-2 max-w-md font-sans text-sm text-[#5A6354] md:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
