import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { Safety } from "@/components/home/Safety";
import { WhyLimovi } from "@/components/home/WhyLimovi";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Safety | LIMOVI",
  description: "Custody, insurance, purity records, verified delivery, lending partners and data protection at LIMOVI.",
};

export default function SafetyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <PageHero
        eyebrow="Safety"
        title={<>Your gold, <span className="text-lm-blue">kept safe</span></>}
        lead="Who holds your jewellery, how it's insured, who lends against it and how your data is protected."
      />
      <Safety />
      <WhyLimovi />
      <FinalCTA />
      <Footer />
    </main>
  );
}
