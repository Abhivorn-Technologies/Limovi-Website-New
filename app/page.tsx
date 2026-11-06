import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GoldBalance } from "@/components/home/GoldBalance";
import { Gateways } from "@/components/home/Gateways";
import { JewelleryShowcase } from "@/components/home/JewelleryShowcase";
import { Strategies } from "@/components/home/Strategies";
import { WhyLimovi } from "@/components/home/WhyLimovi";
import { Safety } from "@/components/home/Safety";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <Hero />
      <TrustMarquee />
      <HowItWorks />
      <GoldBalance />
      <Gateways />
      <JewelleryShowcase />
      <Strategies />
      <WhyLimovi />
      <Safety />
      <HomeFAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
