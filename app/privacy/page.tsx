import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | LIMOVI",
  description: "How LIMOVI collects, uses, processes, stores, retains, discloses and protects Personal Data.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument slug="privacy-policy" />;
}
