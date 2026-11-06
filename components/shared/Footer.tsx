"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Gold Balance", href: "#gold-balance" },
    { label: "Luxury Jewellery Cloud", href: "#gateways" },
    { label: "Instant Loans", href: "#gateways" },
    { label: "Instant Liquidity", href: "#gateways" },
    { label: "Wealth Generation", href: "#gateways" },
    { label: "Gift Gold", href: "#gateways" },
  ],
  compliance: [
    { label: "SEBI Info", href: "/compliance/sebi" },
    { label: "RBI Guidelines", href: "/compliance/rbi" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Delete Policy", href: "/delete-policy" },
  ],
};

const linkClass = "text-white/75 hover:text-white transition-colors";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    if (lenis) lenis.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

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
            India&apos;s first 360° gold asset ecosystem. One Gold Balance for jewellery experiences, loans, liquidity,
            dividends and gifting.
          </p>
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
                <a href={pathname === "/" ? l.href : `/${l.href}`} onClick={(e) => go(e, l.href)} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="col-span-2 lg:col-span-2" aria-label="Compliance and legal">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Compliance &amp; Legal</h4>
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
        <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50">
          Gold loans are provided by RBI-regulated NBFC partners; LIMOVI is the facilitating platform. Payments are handled by
          PCI-DSS compliant gateways. Gold prices are linked to the MCX 24K rate. Figures shown on this site are illustrative
          and use a sample rate of ₹14,400/g.
        </p>
        <div className="flex flex-col justify-between gap-2 py-6 text-sm text-white/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} LIMOVI. All rights reserved.</p>
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
