"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, User, LogOut, Shield } from "lucide-react";
import { useLenis } from "lenis/react";

const navLinks = [
  { name: "Ecosystem", href: "#" },
  {
    name: "Jewellery Cloud",
    href: "#jewellery-experience",
    isDropdown: true,
    subLinks: [
      { name: "Luxury Jewellery", href: "#heritage-collection" },
      { name: "Lifestyle Jewellery", href: "#minimalist-elegance" }
    ]
  },
  {
    name: "Loans & Liquidity",
    href: "#loans",
    isDropdown: true,
    subLinks: [
      { name: "Instant Loans", href: "#loans" },
      { name: "Instant Liquidity", href: "#liquidity" }
    ]
  },
  { name: "Wealth Generation", href: "#wealth" },
  { name: "Gift Gold Ecosystem", href: "#gift-gold" },
  { name: "Platform", href: "#platform" },
];

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);
  const [activeLink,       setActiveLink]       = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("user-state-changed", fetchUser);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("user-state-changed", fetchUser);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setIsProfileMenuOpen(false);
    window.location.reload();
  };


  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  // Lenis owns the scroll position, so anchor jumps go through it (a native smooth scroll gets cancelled)
  const scrollToY = (y: number) => {
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push(`/${href}`);
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
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
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const handleNavClickWithActive = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    setActiveLink(name);
    handleNavClick(e, href);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[999] transition-colors duration-300"
        style={{
          height: "76px",
          background: "#FFFFFF",
        }}
      >
        <div className="frame flex items-center justify-between h-full gap-6">

          {/* ── Wordmark ── */}
          <Link href="/" onClick={(e) => handleNavClick(e, "#")} className="relative z-[999] flex items-center group shrink-0" aria-label="LIMOVI home">
            <div className="transition-opacity duration-200 group-hover:opacity-75 flex items-center gap-1.5 h-[76px]">
              <Image src="/logo-icon.png" alt="" width={254} height={237} priority className="h-[32px] w-auto object-contain" />
              <Image src="/logo-text.png" alt="LIMOVI" width={569} height={236} priority className="h-[44px] w-auto object-contain -mt-1" />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden min-[1400px]:flex items-center gap-6 relative z-[999] h-full" aria-label="Main">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
                onFocus={() => link.isDropdown && setActiveDropdown(link.name)}
              >
                <a
                  href={pathname !== "/" && link.href?.startsWith("#") ? `/${link.href}` : link.href}
                  onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                  aria-haspopup={link.isDropdown ? "true" : undefined}
                  aria-expanded={link.isDropdown ? activeDropdown === link.name : undefined}
                  className={`text-[0.9375rem] font-medium flex items-center gap-1 py-2 whitespace-nowrap transition-colors duration-200 hover:text-[var(--color-field)] ${activeLink === link.name ? "text-[var(--color-field)]" : "text-[var(--color-ink)]"}`}
                >
                  {link.name}
                  {link.isDropdown && (
                    <svg className={`w-3 h-3 mt-0.5 transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="square" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  )}
                </a>

                {/* Dropdown Menu */}
                {link.isDropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[68px] left-0 bg-white py-2 min-w-[230px] shadow-[0_18px_40px_rgba(10,25,41,0.14)]"
                      >
                        {link.subLinks?.map((subLink) => (
                          <a
                            key={subLink.name}
                            href={pathname !== "/" && subLink.href.startsWith("#") ? `/${subLink.href}` : subLink.href}
                            onClick={(e) => handleNavClick(e, subLink.href)}
                            className="block px-5 py-3 text-[0.9375rem] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-field)] transition-colors whitespace-nowrap"
                          >
                            {subLink.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* ── Actions & Mobile Toggle ── */}
          <div className="flex items-center gap-2 relative">
            {/* User Profile Icon / Button (VISIBLE EVERYWHERE) */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  } else {
                    const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL;
                    if (webappUrl && webappUrl !== "undefined") {
                      window.location.href = `${webappUrl}/login`;
                    } else {
                      // Fallback to the local /login page if no webapp URL is set
                      window.location.href = "/login";
                    }
                  }
                }}
                className="flex items-center justify-center w-11 h-11 bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer"
                title={user ? user.fullName : "Create Account / Login"}
                aria-label={user ? `Account: ${user.fullName}` : "Create account or log in"}
              >
                {user ? (
                  <span className="w-full h-full flex items-center justify-center bg-[var(--color-field)] text-white font-medium">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={18} />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-14 w-64 bg-white p-4 z-[1000] shadow-[0_18px_40px_rgba(10,25,41,0.14)]"
                  >
                    <div className="pb-3 mb-2">
                      <p className="font-medium text-[var(--color-ink)]">{user.fullName}</p>
                      <p className="t-small text-[var(--color-muted)] truncate">{user.email}</p>
                      <p className="t-small text-[var(--color-muted)]">{user.phoneNumber}</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
                      >
                        <Shield size={16} className="text-[var(--color-field)]" />
                        <span>Admin Panel</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 font-medium text-red-700 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Early Access (HIDDEN ON MOBILE) */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-early-access-modal"));
              }}
              className="btn btn-accent hidden min-[1400px]:inline-flex !min-h-[44px] !px-5 relative z-[999] whitespace-nowrap"
            >
              Get Early Access
            </button>

            {/* ── Mobile Toggle ── */}
            <button
              className={`min-[1400px]:hidden flex items-center justify-center w-11 h-11 transition-colors relative z-[999] ${isMobileMenuOpen ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-surface)] text-[var(--color-ink)]"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-5 pb-4 min-[1400px]:hidden bg-white"
          >
            <nav
              className="relative flex flex-col flex-1 min-h-0 pb-10 overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
              data-lenis-prevent="true"
              aria-label="Mobile"
            >
              <div className="flex flex-col mt-2">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                    className="w-full"
                  >
                    {link.isDropdown ? (
                      <div className="flex flex-col pt-3">
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                          className={`t-small font-medium px-1 pt-2 block cursor-pointer ${activeLink === link.name ? "text-[var(--color-field)]" : "text-[var(--color-muted)]"}`}
                        >
                          {link.name}
                        </a>
                        <div className="flex flex-col">
                          {link.subLinks?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => handleNavClickWithActive(e, sub.href, sub.name)}
                              className="flex items-center justify-between py-3 px-1 group"
                            >
                              <span className={`text-xl font-medium transition-colors ${activeLink === sub.name ? "text-[var(--color-field)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-field)]"}`}>
                                {sub.name}
                              </span>
                              <ChevronRight size={18} className="pointer-events-none text-[var(--color-muted)] group-hover:text-[var(--color-field)] group-hover:translate-x-1 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                        className="flex items-center justify-between py-3.5 px-1 group"
                      >
                        <span className={`text-xl font-medium transition-colors ${activeLink === link.name ? "text-[var(--color-field)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-field)]"}`}>
                          {link.name}
                        </span>
                        <ChevronRight size={18} className="pointer-events-none text-[var(--color-muted)] group-hover:text-[var(--color-field)] group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <button
                  className="btn btn-accent w-full relative z-[999]"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-early-access-modal"));
                  }}>
                  Get Early Access
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
