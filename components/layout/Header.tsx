"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useConnection } from "wagmi";

const NAV_ITEMS = [
  { label: "Invest", href: "/invest" },
  { label: "RWA Assets", href: "/rwa-assets" },
  { label: "Spectra Token", href: "/spectra-token" },
  { label: "About", href: "/about" },
];

const SUBNAV_ITEMS = [
  { label: "Hedge Fund Strategies", href: "/invest?filter=hedge-fund" },
  { label: "Token Sales", href: "/invest?filter=token-sale" },
  { label: "Real World Assets", href: "/invest?filter=rwa" },
  { label: "Spectra Token", href: "/spectra-token" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubnav, setShowSubnav] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useConnection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // subnav: invest 페이지 or 홈에서 표시
  useEffect(() => {
    setShowSubnav(pathname === "/" || pathname?.startsWith("/invest"));
  }, [pathname]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ── Primary nav ── */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#060C3C]/90 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-[#060C3C]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5" onClick={closeMobile}>
              <Image
                src="/logo/logo-white.png"
                alt="Specfin Technologies"
                width={110}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "?");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              {isConnected ? (
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-md text-[14px] font-semibold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/join?mode=signin"
                    className="px-5 py-2.5 rounded-md text-[14px] font-semibold border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/join"
                    className="px-5 py-2.5 rounded-md text-[14px] font-bold bg-[#0D3880] hover:bg-[#1a4fa0] text-white transition"
                  >
                    Join now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Secondary subnav ── */}
      <AnimatePresence>
        {showSubnav && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block w-full bg-[#040A2E] border-b border-[#36E8CA]/10"
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-1.5">
              {SUBNAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1 text-[12px] font-medium text-white/50 hover:text-[#36E8CA] transition-colors rounded"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-40"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden absolute left-0 right-0 top-full bg-[#060C3C] border-t border-[#36E8CA]/15 z-50 shadow-xl"
            >
              <nav className="flex flex-col px-5 py-5 gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-white/80 hover:text-white font-medium text-base py-3 border-b border-white/5"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.06 }}
                  className="pt-4 flex flex-col gap-2"
                >
                  {isConnected ? (
                    <Link
                      href="/dashboard"
                      onClick={closeMobile}
                      className="w-full text-center py-3 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C]"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/join?mode=signin"
                        onClick={closeMobile}
                        className="w-full text-center py-3 rounded-md text-[15px] font-semibold border border-white/30 text-white"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/join"
                        onClick={closeMobile}
                        className="w-full text-center py-3 rounded-md text-[15px] font-bold bg-[#0D3880] text-white"
                      >
                        Join now
                      </Link>
                    </>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
