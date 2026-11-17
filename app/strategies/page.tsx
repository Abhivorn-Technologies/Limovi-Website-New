import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { Strategies } from "@/components/home/Strategies";
import { NextStep } from "@/components/shared/NextStep";

export const metadata: Metadata = {
  title: "Strategies | LIMOVI",
  description: "Investment Only, Investment & Experience, Enrol & Experience and Experience Only: the key terms of each LIMOVI strategy.",
};

export default function StrategiesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-lm-paper">
      <Navbar />
      <PageHero
        eyebrow="Strategies"
        title={<>Four ways to start. <span className="text-lm-blue">Choose yours.</span></>}
        lead="Everyone uses gold differently, so LIMOVI gives you four ways in. Grow a Gold Balance, own 22K jewellery you love, earn from jewellery you already have, or simply wear a beautiful piece for an occasion. Pick the one that fits you."
      />
      <Strategies tableOpen />
      <NextStep href="/safety" label="Safety" title="See how your gold is kept safe" blurb="Custody, insurance, verified delivery, lending partners and data protection." />
      <Footer />
    </main>
  );
}
