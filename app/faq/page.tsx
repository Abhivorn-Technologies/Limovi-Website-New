import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "FAQs | LIMOVI",
  description: "Answers to common questions about LIMOVI, the Gold Balance, gold loans, Gold Liquidity, Owner Benefit and gifting.",
};

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <PageHero
        eyebrow="FAQs"
        title={<>Frequently asked <span className="text-lm-blue">questions</span></>}
        lead="Short answers drawn from the LIMOVI agreements. The full documents are on the Legal page."
      />
      <HomeFAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
