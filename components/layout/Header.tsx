"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useConnection } from "wagmi";
import { useLanguage } from "@/lib/i18n";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubnav, setShowSubnav] = useState(false);
  const pathname = usePathname();
  const { isConnected } = useConnection();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowSubnav(pathname === "/" || pathname?.startsWith("/invest"));
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  const NAV_ITEMS = [
    { label: t("nav_invest"), href: "/invest" },
    { label: t("nav_rwa"), href: "/rwa-assets" },
    { label: t("nav_spectra"), href: "/spectra-token" },
    { label: t("nav_about"), href: "/about" },
  ];

  const SUBNAV_ITEMS = [
    { label: t("subnav_hedge"), href: "/invest?filter=hedge-fund" },
    { label: t("subnav_token"), href: "/invest?filter=token-sale" },
    { label: t("subnav_rwa"), href: "/invest?filter=rwa" },
    { label: t("subnav_spectra"), href: "/spectra-token" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-[#E8EDF4]"
            : "bg-white border-[#E8EDF4]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMobile}>
              <Image
                src="/logo/logo-dark.png"
                alt="Specfin Technologies"
                width={110}
                height={32}
                className="h-8 w-auto"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo/logo-white.png";
                }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "?");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
                      isActive
                        ? "text-[#0D3880] bg-[#0D3880]/8 font-semibold"
                        : "text-[#4A5568] hover:text-[#0D3880] hover:bg-[#0D3880]/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs + Language Toggle */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Language Toggle */}
              <div className="flex items-center rounded-md border border-[#E8EDF4] overflow-hidden mr-1">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1.5 text-[12px] font-bold transition-colors ${
                    lang === "en"
                      ? "bg-[#0D3880] text-white"
                      : "text-[#4A5568] hover:bg-[#F7F9FC]"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ko")}
                  className={`px-2.5 py-1.5 text-[12px] font-bold transition-colors ${
                    lang === "ko"
                      ? "bg-[#0D3880] text-white"
                      : "text-[#4A5568] hover:bg-[#F7F9FC]"
                  }`}
                >
                  한국어
                </button>
              </div>

              {isConnected ? (
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-md text-[14px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition"
                >
                  {t("nav_dashboard")}
                </Link>
              ) : (
                <>
                  <Link
                    href="/join?mode=signin"
                    className="px-5 py-2.5 rounded-md text-[14px] font-semibold border border-[#E8EDF4] text-[#0B1628] hover:border-[#0D3880]/40 hover:text-[#0D3880] transition"
                  >
                    {t("nav_signin")}
                  </Link>
                  <Link
                    href="/join"
                    className="px-5 py-2.5 rounded-md text-[14px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition shadow-sm"
                  >
                    {t("nav_join")}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="flex items-center rounded-md border border-[#E8EDF4] overflow-hidden">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 text-[11px] font-bold transition-colors ${
                    lang === "en" ? "bg-[#0D3880] text-white" : "text-[#4A5568]"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ko")}
                  className={`px-2 py-1 text-[11px] font-bold transition-colors ${
                    lang === "ko" ? "bg-[#0D3880] text-white" : "text-[#4A5568]"
                  }`}
                >
                  KO
                </button>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0B1628] p-2"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-0.5 bg-[#0B1628] transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block h-0.5 bg-[#0B1628] transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 bg-[#0B1628] transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subnav */}
      <AnimatePresence>
        {showSubnav && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block w-full bg-[#F7F9FC] border-b border-[#E8EDF4]"
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-1.5">
              {SUBNAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1 text-[12px] font-medium text-[#4A5568] hover:text-[#00A896] hover:bg-[#00A896]/8 transition-colors rounded"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-[#E8EDF4] z-50 shadow-lg"
            >
              <nav className="flex flex-col px-5 py-4 gap-0.5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-[#4A5568] hover:text-[#0D3880] font-medium text-[15px] py-3 border-b border-[#F7F9FC]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="pt-4 flex flex-col gap-2"
                >
                  {isConnected ? (
                    <Link href="/dashboard" onClick={closeMobile} className="w-full text-center py-3 rounded-md text-[15px] font-bold bg-[#0D3880] text-white">
                      {t("nav_dashboard")}
                    </Link>
                  ) : (
                    <>
                      <Link href="/join?mode=signin" onClick={closeMobile} className="w-full text-center py-3 rounded-md text-[15px] font-semibold border border-[#E8EDF4] text-[#0B1628]">
                        {t("nav_signin")}
                      </Link>
                      <Link href="/join" onClick={closeMobile} className="w-full text-center py-3 rounded-md text-[15px] font-bold bg-[#0D3880] text-white">
                        {t("nav_join")}
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
