import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Website & Mobile Application Terms of Use | LIMOVI",
  description: "Terms governing access to and use of the LIMOVI website, mobile application and other digital interfaces.",
};

export default function TermsPage() {
  return <LegalDocument slug="website-app-terms" />;
}
