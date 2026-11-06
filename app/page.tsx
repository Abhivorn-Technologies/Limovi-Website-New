import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CinematicHero } from "@/components/home/CinematicHero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { Gateways } from "@/components/home/Gateways";
import { JewelleryShowcase } from "@/components/home/JewelleryShowcase";
import { Strategies } from "@/components/home/Strategies";
import { WhyLimovi } from "@/components/home/WhyLimovi";
import { FinalCTA } from "@/components/home/FinalCTA";

// Home gives an overview; each part links through to its own page.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <CinematicHero />
      <TrustMarquee />
      <Gateways overview />
      <JewelleryShowcase />
      <Strategies preview />
      <WhyLimovi />
      <FinalCTA />
      <Footer />
    </main>
  );
}
