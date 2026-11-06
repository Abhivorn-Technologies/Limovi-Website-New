import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Mail, MessageCircle, Scale, Clock, CheckCheck, ArrowUp, Plus } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Coin, Rays, Reveal } from "@/components/home/primitives";
import { whatsappLink } from "@/lib/contact";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | LIMOVI",
  description: "Talk to the LIMOVI team on WhatsApp or email, or raise a grievance.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "Chat with us",
    value: "WhatsApp",
    href: whatsappLink("Hello LIMOVI Team,"),
    external: true,
    tone: "bg-emerald-500 text-white",
  },
  {
    icon: Mail,
    label: "Write to us",
    value: "support@limovi.in",
    href: "mailto:support@limovi.in",
    external: true,
    tone: "bg-lm-blue text-white",
  },
  {
    icon: Scale,
    label: "Raise a complaint",
    value: "Grievance Redressal",
    href: "/grievance",
    external: false,
    tone: "bg-lm-gold text-lm-navy",
  },
];

// Timelines from the Grievance Redressal Policy, clauses 6.1, 8.1 and 9.1.
const grievanceSteps = [
  { icon: Clock, title: "Acknowledged", body: "LIMOVI aims to acknowledge a grievance within 4 to 6 business days, often with a reference number." },
  { icon: CheckCheck, title: "Resolved", body: "LIMOVI aims to resolve it and share its decision within 15 days, depending on the matter." },
  { icon: ArrowUp, title: "Escalated if needed", body: "Not satisfied? You can ask for escalation to a designated senior officer." },
];

const quick = ["What is a Gold Balance?", "How much do I need to start?", "Who gives the gold loan?"];

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-lm-sky to-white pb-16 pt-[120px] sm:pt-[140px]">
        <div className="pointer-events-none absolute -right-[25vw] -top-[25vw] -z-10 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] text-lm-sky-2 opacity-70">
          <Rays className="lm-rays h-full w-full" count={36} hole={34} />
        </div>
        <div className="lm-bob absolute right-[8%] top-[22%] hidden lg:block" style={{ ["--d" as string]: "6s" }}>
          <Coin size={84} label="24K" />
        </div>
        <div className="lm-bob absolute right-[30%] top-[16%] hidden lg:block" style={{ ["--d" as string]: "5s", ["--delay" as string]: "1s" }}>
          <Coin size={46} label="₹" />
        </div>

        <div className="frame">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-semibold text-lm-muted">
            <Link href="/" className="hover:text-lm-blue">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-lm-blue">Contact</span>
          </nav>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.6rem,1.4rem+4.6vw,5rem)] leading-[1.02] text-lm-navy">
            Let&apos;s talk <span className="text-lm-blue">gold.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] leading-relaxed text-lm-muted">
            A question about your Gold Balance, a service or early access? Pick the way that suits you and the LIMOVI team will get
            back to you.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.label} i={i}>
                <a
                  href={c.href}
                  {...(c.external && c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-center gap-4 rounded-[28px] border border-lm-line bg-white p-5 shadow-[0_20px_40px_-32px_rgba(11,27,58,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-lm-blue/40"
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${c.tone}`}>
                    <c.icon size={24} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-lm-muted">{c.label}</span>
                    <span className="block truncate text-lg font-extrabold text-lm-navy">{c.value}</span>
                  </span>
                  <ArrowUpRight size={20} className="shrink-0 text-lm-blue transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + side panel */}
      <section className="pb-24 pt-4 lg:pb-32">
        <div className="frame grid gap-6 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <div className="rounded-[36px] border border-lm-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(11,27,58,0.45)] sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">Send a message</p>
              <h2 className="display mt-2 text-[clamp(1.7rem,1.3rem+1.2vw,2.4rem)] text-lm-navy">Tell us what you need</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <Reveal i={1}>
              <div className="relative overflow-hidden rounded-[36px] bg-lm-navy p-7 text-white sm:p-9">
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 text-white/[0.07]">
                  <Rays className="lm-rays h-full w-full" count={28} hole={30} />
                </div>
                <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">If something went wrong</p>
                <p className="display relative mt-2 text-2xl">How a complaint is handled</p>
                <ol className="relative mt-6 space-y-5">
                  {grievanceSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="relative flex flex-col items-center">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-lm-gold">
                          <s.icon size={20} />
                        </span>
                        {i < grievanceSteps.length - 1 && <span className="mt-1 w-px flex-1 bg-white/15" />}
                      </span>
                      <span className="pb-1">
                        <span className="block font-bold">{s.title}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-white/70">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href="/grievance" className="relative mt-7 inline-flex items-center gap-2 font-bold text-lm-gold hover:underline">
                  Read the Grievance Redressal Policy <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>

            <Reveal i={2}>
              <div className="rounded-[36px] bg-lm-sky p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">Quick answers</p>
                <p className="display mt-2 text-2xl text-lm-navy">Maybe it&apos;s already answered</p>
                <div className="mt-5 space-y-2">
                  {quick.map((q) => (
                    <Link
                      key={q}
                      href="/faq"
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 font-semibold text-lm-navy transition-colors hover:text-lm-blue"
                    >
                      {q}
                      <Plus size={16} className="shrink-0 text-lm-blue transition-transform duration-300 group-hover:rotate-90" />
                    </Link>
                  ))}
                </div>
                <Link href="/faq" className="mt-5 inline-flex items-center gap-2 font-bold text-lm-blue hover:underline">
                  See all FAQs <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
