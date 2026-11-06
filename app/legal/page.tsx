import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { legalDocs, type LegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal | LIMOVI",
  description: "LIMOVI's customer agreements, strategy agreements, policies and service terms.",
};

const groups: { name: LegalDoc["group"]; blurb: string }[] = [
  { name: "Platform", blurb: "The agreements and policies that apply to everyone who uses LIMOVI." },
  { name: "Products", blurb: "Terms for Digital Gold and the Gold Liquidity service." },
  { name: "Strategies", blurb: "The strategy-specific agreements, read together with the Master Customer & Platform Agreement." },
];

export default function LegalIndexPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <section className="bg-gradient-to-b from-lm-sky to-white pt-[120px] pb-12 sm:pt-[140px]">
        <div className="frame">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-lm-blue">Legal</p>
          <h1 className="display mt-2 text-[clamp(2.2rem,1.4rem+3vw,3.8rem)] text-lm-navy">Agreements &amp; policies</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-lm-muted">
            Every LIMOVI customer document in one place. Where documents differ, the order of precedence in the Master
            Customer &amp; Platform Agreement applies.
          </p>
        </div>
      </section>

      <section className="frame space-y-14 pb-24">
        {groups.map((g) => (
          <div key={g.name}>
            <h2 className="display text-2xl text-lm-navy">{g.name}</h2>
            <p className="mt-1 text-lm-muted">{g.blurb}</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {legalDocs
                .filter((d) => d.group === g.name)
                .map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/legal/${d.slug}`}
                      className="group flex h-full items-start gap-4 rounded-3xl border border-lm-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-lm-blue hover:shadow-lg"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lm-sky text-lm-blue">
                        <FileText size={20} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-lm-navy">{d.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-lm-muted">{d.summary}</span>
                      </span>
                      <ArrowRight size={18} className="mt-1 shrink-0 text-lm-blue transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
