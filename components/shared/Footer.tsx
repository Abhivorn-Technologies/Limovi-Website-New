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
    { label: "Get Early Access", isModal: true, href: "" },
  ],
  products: [
    { label: "Gold Balance", href: "#platform" },
    { label: "Luxury Jewellery Cloud", href: "#jewellery-experience" },
    { label: "Instant Loans", href: "#loans" },
    { label: "Instant Liquidity", href: "#liquidity" },
    { label: "Wealth Generation", href: "#wealth" },
    { label: "Gift Gold Ecosystem", href: "#gift-gold" },
  ],
  compliance: [
    { label: "SEBI Info", href: "/compliance/sebi" },
    { label: "RBI Guidelines", href: "/compliance/rbi" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Delete Policy", href: "/delete-policy" },
  ],
};

const linkClass = "text-white/90 hover:text-white transition-colors duration-200 hover:underline underline-offset-4 decoration-[1.5px]";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const scrollToY = (y: number) => {
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }
      const targetId = href.replace("#", "");
      if (targetId === "") {
        scrollToY(0);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          scrollToY(element.getBoundingClientRect().top + window.scrollY - 76);
        }
      }
    }
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-deep)] text-white min-h-[88svh] lg:min-h-[100svh] flex flex-col">
      {/* Background Photograph with Vignette / Fade Mask */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        <Image
          src="/images/footer.jpg"
          alt="Limovi Footer Background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
          style={{
            filter: "brightness(0.7) contrast(1.05)",
            WebkitMaskImage:
              "radial-gradient(ellipse 95% 75% at 50% 50%, black 35%, transparent 95%)",
            maskImage:
              "radial-gradient(ellipse 95% 75% at 50% 50%, black 35%, transparent 95%)",
          }}
        />
      </div>

      {/* Dark Ambient Overlay Mask for Contrast and Legibility */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7, 17, 31, 0.88) 0%, rgba(7, 17, 31, 0.35) 42%, rgba(7, 17, 31, 0.65) 75%, rgba(7, 17, 31, 0.95) 100%)",
        }}
      />

      <div className="frame pt-16 lg:pt-20 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-2 lg:col-span-4">
          <p className="t-lead max-w-[30ch]">
            India&apos;s first 360° Gold Asset Ecosystem. Convert your gold into liquidity, luxury experiences, and wealth.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <a href="#" className="w-11 h-11 bg-white/12 hover:bg-white hover:text-[var(--color-ink)] flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="#" className="w-11 h-11 bg-white/12 hover:bg-white hover:text-[var(--color-ink)] flex items-center justify-center transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
          </div>
        </div>

        <nav className="lg:col-start-6 lg:col-span-2" aria-label="Company">
          <h4 className="t-small font-medium text-white/70 mb-4">Company</h4>
          <ul className="space-y-2.5">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                {link.isModal ? (
                  <button onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))} className={`${linkClass} text-left cursor-pointer`}>
                    {link.label}
                  </button>
                ) : (
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-label="Products">
          <h4 className="t-small font-medium text-white/70 mb-4">Products</h4>
          <ul className="space-y-2.5">
            {footerLinks.products.map((link) => (
              <li key={link.label}>
                <Link
                  href={pathname !== "/" && link.href.startsWith("#") ? `/${link.href}` : link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="col-span-2 lg:col-span-2" aria-label="Compliance and legal">
          <h4 className="t-small font-medium text-white/70 mb-4">Compliance &amp; Legal</h4>
          <ul className="space-y-2.5">
            {footerLinks.compliance.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* The name returns at full width */}
      <div className="frame mt-auto pt-16 pb-8 lg:pb-10">
        <Image
          src="/logo-text.png"
          alt="LIMOVI, the gold ecosystem"
          width={569}
          height={236}
          className="w-full max-w-[1100px] h-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-2 t-small text-white/75">
          <p>© {new Date().getFullYear()} LIMOVI. All rights reserved.</p>
          <p className="flex items-center gap-1.5 flex-wrap">
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
