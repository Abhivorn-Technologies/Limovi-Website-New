import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GoldBalance } from "@/components/home/GoldBalance";
import { NextStep } from "@/components/shared/NextStep";

export const metadata: Metadata = {
  title: "How it works | LIMOVI",
  description: "Register, pick a strategy, build your Gold Balance and use it across LIMOVI's services.",
};

export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <PageHero
        eyebrow="How it works"
        title={<>From locker to living gold, <span className="text-lm-blue">in four steps</span></>}
        lead="LIMOVI turns the gold you hold into something you can experience, borrow against through a lending partner, sell, earn from and gift. Here's the journey."
      />
      <HowItWorks />
      <GoldBalance />
      <NextStep href="/services" label="Services" title="Five ways to use your Gold Balance" blurb="Jewellery Cloud, Gold Loan, Gold Liquidity, Owner Benefit and Gift Gold, with the steps for each." />
      <Footer />
    </main>
  );
}
