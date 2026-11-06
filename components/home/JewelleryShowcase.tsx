import Image from "next/image";
import { SectionHead } from "./primitives";
import { lifestylePieces, luxuryPieces } from "./data";

function Row({ items, reverse, label }: { items: { name: string; src: string }[]; reverse?: boolean; label: string }) {
  const row = [...items, ...items];
  return (
    <div className="lm-marquee-wrap overflow-hidden">
      <ul className={`${reverse ? "lm-marquee-rev" : "lm-marquee"} flex w-max gap-5`} style={{ ["--speed" as string]: "55s" }}>
        {row.map((p, i) => (
          <li key={i} className="w-[220px] shrink-0 sm:w-[260px]" aria-hidden={i >= items.length}>
            <div className="group overflow-hidden rounded-[28px] bg-white shadow-[0_20px_40px_-25px_rgba(11,27,58,0.5)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-lm-navy backdrop-blur">
                  {label}
                </span>
              </div>
              <p className="px-4 py-3 font-bold text-lm-navy">{p.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JewelleryShowcase() {
  return (
    <section id="jewellery-cloud" className="overflow-hidden bg-lm-cream py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="The Jewellery Cloud"
          title={<>Big jewellery dreams, <span className="text-lm-gold-deep">without buying every piece</span></>}
          lead="Bridal sets for the wedding season, something lighter for every day. Pick a piece from the Jewellery Cloud, enjoy it, and return it within 30 hours of delivery."
        />
      </div>
      <div className="mt-14 space-y-5">
        <Row items={luxuryPieces} label="Luxury" />
        <Row items={lifestylePieces} label="Lifestyle" reverse />
      </div>
    </section>
  );
}
