import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PressPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Press & <span className="text-[#005CB9]">Media</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            News and announcements from LIMOVI.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm text-center">
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            LIMOVI hasn&apos;t published any press releases yet. Announcements will appear here when they&apos;re made.
          </p>
          <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-[#005CB9] font-bold">
            Media enquiries: get in touch
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
