import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CinematicHero } from "@/components/home/CinematicHero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { ExploreGrid } from "@/components/home/ExploreGrid";
import { WhyLimovi } from "@/components/home/WhyLimovi";
import { FinalCTA } from "@/components/home/FinalCTA";

// Home gives an overview; each part links through to its own page.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <CinematicHero />
      <TrustMarquee />
      <ExploreGrid />
      <WhyLimovi />
      <FinalCTA />
      <Footer />
    </main>
  );
}
