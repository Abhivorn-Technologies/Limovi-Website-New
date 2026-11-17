"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Safety", href: "/safety" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Gold Balance", href: "/how-it-works" },
    { label: "Jewellery Cloud", href: "/services#jewellery" },
    { label: "Gold Loan", href: "/services#loans" },
    { label: "Gold Liquidity", href: "/services#liquidity" },
    { label: "Generate Wealth", href: "/services#wealth" },
    { label: "Gift Gold", href: "/services#gift" },
    { label: "Strategies", href: "/strategies" },
  ],
  compliance: [
    { label: "All legal documents", href: "/legal" },
    { label: "Master Customer Agreement", href: "/legal/master-customer-agreement" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Grievance Redressal", href: "/grievance" },
    { label: "Account & Data Deletion", href: "/delete-policy" },
  ],
};

const linkClass = "text-white/75 hover:text-white transition-colors";

export function Footer() {
  return (
    <footer className="bg-lm-navy text-white">
      <div className="frame grid grid-cols-2 gap-x-8 gap-y-10 pt-16 pb-10 lg:grid-cols-12 lg:pt-20">
        <div className="col-span-2 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-white p-2">
              <Image src="/logo-icon.png" alt="" width={254} height={237} className="h-9 w-auto" />
            </span>
            <span className="display text-2xl tracking-[0.08em]">LIMOVI</span>
          </div>
          <p className="mt-5 max-w-[34ch] text-white/75 leading-relaxed">
            India&apos;s first 360° gold asset ecosystem. One Gold Balance for jewellery experiences, gold loans through
            lending partners, Gold Liquidity, Generate Wealth and gifting.
          </p>
          <div className="mt-4 max-w-[34ch] text-xs leading-relaxed text-white/60">
            <span className="font-semibold text-white/80">Registered Office:</span><br />
            2-18-30, Prashanth Nagar, Near Meenakshi Residency, Uppal (K.V. Rangareddy), Hyderabad, Rangareddy District, Telangana - 500039
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))}
            className="lm-btn lm-btn-gold mt-6"
          >
            Get Early Access
          </button>
        </div>

        <nav className="lg:col-start-6 lg:col-span-2" aria-label="Company">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Company</h4>
          <ul className="space-y-2.5">
            {footerLinks.company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-label="Products">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Products</h4>
          <ul className="space-y-2.5">
            {footerLinks.products.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="col-span-2 lg:col-span-2" aria-label="Legal">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Legal</h4>
          <ul className="space-y-2.5">
            {footerLinks.compliance.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="frame">
        <div className="border-t border-white/10 pt-6 space-y-2 text-xs leading-relaxed text-white/50">
          <p>
            <strong className="font-semibold text-white/70">Disclaimer:</strong> LIMOVI is a technology platform owned
            and operated by Limovi Gold Ecosystem Private Limited (CIN: U46498TS2026PTC213405). Limovi is not a bank
            or NBFC. Digital Gold is vaulted in 100% insured physical vaults with certified bullion partners (Augmont)
            under independent trustee custody. Gold loans accessible via the platform are originated, underwritten, and
            disbursed exclusively by RBI-registered NBFC / Banking partners.
          </p>
          <p>
            Gold prices fluctuate, and LIMOVI does not guarantee any minimum value, appreciation or return. This website is
            a summary: your rights and charges are set by the LIMOVI agreements published on the Legal page, and no
            promotional material overrides them.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2 py-6 text-sm text-white/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Limovi Gold Ecosystem Private Limited (CIN: U46498TS2026PTC213405). All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>Developed by</span>
            <a href="https://www.abhivorn.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:underline underline-offset-4">
              Abhivorn Technologies
            </a>
            <span>&amp;</span>
            <a href="https://www.digilevelup.in/" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:underline underline-offset-4">
              DigiLevelup
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
