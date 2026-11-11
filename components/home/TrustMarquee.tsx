import { BadgeCheck } from "lucide-react";

const items = [
  "Digital Gold Backed Jewelry Experience",
  "Own One – Experience Unlimited",
  "Enroll One – Experience Unlimited",
  "Earn 25% Dividends on Physical Gold",
  "Liquidity Without Losing Dignity",
  "Unlock Gold, Unlock Possibilities",
  "Transforming Gold into Generational Legacy",
  "Gift a Future, Not Just Gold",
  "Save on Making Charges, Build Gold Balance",
];

export function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Why people trust LIMOVI" className="lm-marquee-wrap relative overflow-hidden border-y border-lm-line bg-lm-paper py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <ul className="lm-marquee flex w-max items-center gap-10" style={{ ["--speed" as string]: "45s" }}>
        {row.map((t, i) => (
          <li key={i} className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold text-lm-ink" aria-hidden={i >= items.length}>
            <BadgeCheck size={20} className="text-lm-blue" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
