import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getLegalDoc, legalDocs } from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  return doc ? { title: `${doc.title} | LIMOVI`, description: doc.summary } : {};
}

export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getLegalDoc(slug)) notFound();
  return <LegalDocument slug={slug} />;
}
