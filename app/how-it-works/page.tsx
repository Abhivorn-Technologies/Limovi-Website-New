import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GoldBalance } from "@/components/home/GoldBalance";
import { FinalCTA } from "@/components/home/FinalCTA";

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
        title={<>How LIMOVI <span className="text-lm-blue">works</span></>}
        lead="From registering to using your Gold Balance, here is the journey and what your Gold Balance is."
      />
      <HowItWorks />
      <GoldBalance />
      <FinalCTA />
      <Footer />
    </main>
  );
}
