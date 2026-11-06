import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { Gateways } from "@/components/home/Gateways";
import { JewelleryShowcase } from "@/components/home/JewelleryShowcase";
import { NextStep } from "@/components/shared/NextStep";

export const metadata: Metadata = {
  title: "Services | LIMOVI",
  description: "Jewellery Cloud, Gold Loan, Gold Liquidity, Owner Benefit and Gift Gold: what each LIMOVI service does and what it costs.",
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <PageHero
        eyebrow="Services"
        title={<>Everything your gold can do, <span className="text-lm-blue">in one place</span></>}
        lead="Jewellery Cloud, Gold Loan, Gold Liquidity, Owner Benefit and Gift Gold. Pick a service to see the steps and the key terms."
      />
      <Gateways />
      <JewelleryShowcase />
      <NextStep href="/strategies" label="Strategies" title="Pick the strategy that fits you" blurb="Four strategies, each with its own agreement. Compare them side by side." />
      <Footer />
    </main>
  );
}
