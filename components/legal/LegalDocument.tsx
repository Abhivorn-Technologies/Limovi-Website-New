import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { getLegalDoc, legalDocs, loadLegalHtml } from "@/lib/legal";
import { HashScroll } from "./HashScroll";

export function LegalDocument({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug);
  if (!doc) return null;
  const { html, headings } = loadLegalHtml(slug);
  const related = legalDocs.filter((d) => d.group === doc.group && d.slug !== slug);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <HashScroll />
      <section className="bg-gradient-to-b from-lm-sky to-white pt-[120px] pb-10 sm:pt-[140px]">
        <div className="frame">
          <Link href="/legal" className="inline-flex items-center gap-2 text-sm font-semibold text-lm-blue hover:underline">
            <ArrowLeft size={16} /> All legal documents
          </Link>
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.12em] text-lm-blue">{doc.group}</p>
          <h1 className="display mt-2 max-w-4xl text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] text-lm-navy">{doc.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-lm-muted">{doc.summary}</p>
        </div>
      </section>

      <section className="frame grid gap-10 pb-24 lg:grid-cols-12">
        {headings.length > 0 && (
          <aside className="lg:col-span-4 xl:col-span-3">
            <details className="group rounded-2xl border border-lm-line bg-white p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto" open>
              <summary className="cursor-pointer list-none text-sm font-bold text-lm-navy">On this page</summary>
              <ol className="mt-3 space-y-1.5 text-[13px] leading-snug">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-lm-muted hover:text-lm-blue">
                      {h.label}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </aside>
        )}

        <div className={headings.length > 0 ? "lg:col-span-8 xl:col-span-9" : "lg:col-span-12"}>
          <article className="lm-legal" dangerouslySetInnerHTML={{ __html: html }} />

          {related.length > 0 && (
            <div className="mt-16 border-t border-lm-line pt-8">
              <p className="text-sm font-bold text-lm-navy">Related documents</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/legal/${d.slug}`} className="flex items-start gap-3 rounded-2xl border border-lm-line p-4 transition-colors hover:border-lm-blue">
                      <FileText size={18} className="mt-0.5 shrink-0 text-lm-blue" />
                      <span className="text-sm font-semibold text-lm-navy">{d.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
