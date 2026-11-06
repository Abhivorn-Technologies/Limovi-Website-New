import type { Metadata } from "next";
import { Target, Telescope } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { NextStep } from "@/components/shared/NextStep";
import { Rays, Reveal } from "@/components/home/primitives";

export const metadata: Metadata = {
  title: "About | LIMOVI",
  description: "LIMOVI is building a 360° gold ecosystem that puts gold to work.",
};

const pillars = ["Jewellery", "Finance", "Technology"];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <PageHero
        eyebrow="About"
        title={<>Redefining how India uses <span className="text-lm-blue">its gold</span></>}
        lead="We are redefining how India interacts with its most trusted asset. LIMOVI transforms idle gold into a dynamic engine for wealth, luxury, and liquidity."
      />

      <section className="pb-20 pt-6 lg:pb-28">
        <div className="frame grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-[36px] bg-lm-blue p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 text-white/10 transition-transform duration-[1.5s] group-hover:rotate-45">
                <Rays className="h-full w-full" count={32} hole={30} />
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-lm-blue">
                <Target size={26} />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">Our mission</p>
              <p className="display mt-2 text-3xl">To put gold to work</p>
              <p className="relative mt-4 max-w-lg leading-relaxed text-white/80">
                Instead of sitting idle in a locker, gold on LIMOVI can be experienced as jewellery, used to apply for a loan through a
                lending partner, sold when you need money, and earn an Owner Benefit when others experience your jewellery.
              </p>
            </div>
          </Reveal>
          <Reveal i={1}>
            <div className="group relative h-full overflow-hidden rounded-[36px] bg-lm-navy p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 text-lm-gold/15 transition-transform duration-[1.5s] group-hover:-rotate-45">
                <Rays className="h-full w-full" count={32} hole={30} />
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lm-gold text-lm-navy">
                <Telescope size={26} />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">Our vision</p>
              <p className="display mt-2 text-3xl">A 360° gold ecosystem</p>
              <p className="relative mt-4 max-w-lg leading-relaxed text-white/80">
                To build a 360° gold ecosystem where every gram of gold is put to use, bringing together jewellery, finance and
                technology for individuals and families.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="frame mt-16">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-lm-muted">Bringing together</p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                {pillars.map((p, i) => (
                  <span key={p} className="flex items-center gap-3 sm:gap-5">
                    <span className="display rounded-full border-2 border-lm-line px-6 py-3 text-xl text-lm-navy transition-colors hover:border-lm-blue hover:text-lm-blue sm:text-3xl">
                      {p}
                    </span>
                    {i < pillars.length - 1 && <span className="display text-2xl text-lm-gold sm:text-4xl">+</span>}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <NextStep
        href="/contact"
        label="Contact"
        title="Have a question for the team?"
        blurb="Message LIMOVI on WhatsApp or email, or find out how complaints are handled."
      />
      <Footer />
    </main>
  );
}
