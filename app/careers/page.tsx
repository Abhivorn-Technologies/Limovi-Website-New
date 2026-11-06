import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Join Our <span className="text-[#005CB9]">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Help us build the future of India's gold ecosystem. We're looking for passionate builders, thinkers, and innovators to join our journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0A1929] mb-8">Open Positions</h3>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 font-medium leading-relaxed">
              There are no open positions listed right now. If you&apos;d like to be considered for future roles, please{" "}
              <a href="/contact" className="font-bold text-[#005CB9]">get in touch</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
