"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export const navLinks = [
  { name: "How it works", href: "/how-it-works" },
  { name: "Services", href: "/services" },
  { name: "Strategies", href: "/strategies" },
  { name: "Safety", href: "/safety" },
  { name: "FAQs", href: "/faq" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const openEarlyAccess = () => window.dispatchEvent(new CustomEvent("open-early-access-modal"));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[999] px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-4 rounded-full px-4 sm:px-6 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 shadow-[0_10px_30px_-15px_rgba(11,27,58,0.35)] backdrop-blur-md border border-lm-line"
              : "bg-white/60 backdrop-blur-sm border border-transparent"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="LIMOVI home">
            <Image src="/logo-icon.png" alt="" width={254} height={237} priority className="h-8 w-auto" />
            <Image src="/logo-text.png" alt="LIMOVI" width={569} height={236} priority className="h-10 w-auto -mt-0.5" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-[15px] font-medium transition-colors xl:px-3.5 ${
                  isActive(l.href) ? "bg-lm-sky text-lm-blue" : "text-lm-ink hover:bg-lm-sky hover:text-lm-blue"
                }`}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={openEarlyAccess} className="lm-btn lm-btn-blue hidden sm:inline-flex !min-h-[44px] !px-5 text-[15px]">
              Get Early Access
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-full bg-lm-sky text-lm-navy"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-[84px] z-[998] max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[28px] border border-lm-line bg-white p-4 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[{ name: "Home", href: "/" }, ...navLinks].map((l, i) => (
                <motion.div key={l.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={(l.href === "/" ? pathname === "/" : isActive(l.href)) ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium text-lm-navy hover:bg-lm-sky ${
                      (l.href === "/" ? pathname === "/" : isActive(l.href)) ? "bg-lm-sky" : ""
                    }`}
                  >
                    {l.name}
                    <ArrowRight size={18} className="text-lm-blue" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <button
              onClick={() => {
                setOpen(false);
                openEarlyAccess();
              }}
              className="lm-btn lm-btn-blue mt-3 w-full"
            >
              Get Early Access
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
