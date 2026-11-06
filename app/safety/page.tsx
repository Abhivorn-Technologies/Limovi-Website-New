import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { Safety } from "@/components/home/Safety";
import { CustodyJourney } from "@/components/safety/CustodyJourney";
import { NextStep } from "@/components/shared/NextStep";

export const metadata: Metadata = {
  title: "Safety | LIMOVI",
  description: "Custody, insurance, purity records, verified delivery, lending partners and data protection at LIMOVI.",
};

export default function SafetyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-lm-paper">
      <Navbar />
      <PageHero
        eyebrow="Safety"
        title={<>How we keep your gold <span className="text-lm-blue">safe</span></>}
        lead="Who holds your jewellery, how it's insured, who lends against it and how your data is protected."
      />
      <CustodyJourney />
      <Safety only={["Loans from lending partners", "Your data, protected"]} />
      <NextStep href="/faq" label="FAQs" title="Questions, answered" blurb="Short answers drawn from the LIMOVI agreements." />
      <Footer />
    </main>
  );
}
