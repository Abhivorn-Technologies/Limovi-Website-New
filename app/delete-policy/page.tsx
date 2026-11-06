import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { loadLegalHtml } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Account & Data Deletion | LIMOVI",
  description: "How LIMOVI retains Personal Data and handles requests concerning it, as set out in the LIMOVI Privacy Policy.",
};

// This page shows clauses 12 and 13 of the Privacy Policy word for word, so it
// can never drift from the policy itself.
function retentionAndRights() {
  const { html } = loadLegalHtml("privacy-policy");
  const start = html.indexOf('<h2 id="12-');
  const end = html.indexOf('<h2 id="14-');
  return start >= 0 && end > start ? html.slice(start, end) : "";
}

export default function DeletePolicyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <section className="bg-gradient-to-b from-lm-sky to-white pt-[120px] pb-10 sm:pt-[140px]">
        <div className="frame">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-lm-blue">Privacy</p>
          <h1 className="display mt-2 text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] text-lm-navy">Account &amp; data deletion</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-lm-muted">
            Requests to delete an account or Personal Data are handled under the LIMOVI Privacy Policy. The relevant
            clauses are reproduced below.
          </p>
        </div>
      </section>
      <section className="frame pb-24">
        <article className="lm-legal max-w-4xl" dangerouslySetInnerHTML={{ __html: retentionAndRights() }} />
        <Link href="/privacy" className="lm-btn lm-btn-blue mt-10">
          Read the full Privacy Policy <ArrowRight size={18} />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
