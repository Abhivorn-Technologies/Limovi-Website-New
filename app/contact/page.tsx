import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Get in <span className="text-[#005CB9]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Have questions about the Gold Ecosystem? We&apos;re here to help you navigate your journey.
          </p>
        </div>
          
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#0A1929] mb-6">Send us a Message</h3>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Direct Contact</h3>
              <p className="text-slate-600 font-medium mb-2">For general inquiries and support:</p>
              <a href="mailto:support@limovi.in" className="text-[#005CB9] text-xl font-black hover:underline block mb-1">
                support@limovi.in
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Complaints</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                To raise a grievance, see our{" "}
                <a href="/grievance" className="font-bold text-[#005CB9] hover:underline">Grievance Redressal Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
