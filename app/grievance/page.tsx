import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Grievance Redressal Policy | LIMOVI",
  description: "The mechanism through which a Customer, Registered User, Visitor or other person may raise a grievance with LIMOVI.",
};

export default function GrievancePage() {
  return <LegalDocument slug="grievance-redressal-policy" />;
}
