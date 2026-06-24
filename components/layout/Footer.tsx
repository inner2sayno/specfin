"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage, TKey } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  const COLS: Record<string, { key: TKey; href: string }[]> = {
    [t("footer_col_platform")]: [
      { key: "footer_link_howtoinvest", href: "/how-to-invest" },
      { key: "footer_link_invest", href: "/invest" },
      { key: "footer_link_rwa", href: "/rwa-assets" },
      { key: "footer_link_spectra", href: "/spectra-token" },
      { key: "footer_link_leaderboard", href: "/leaderboard" },
    ],
    [t("footer_col_company")]: [
      { key: "footer_link_about", href: "/about" },
      { key: "footer_link_team", href: "/about" },
      { key: "footer_link_careers", href: "/careers" },
      { key: "footer_link_press", href: "/press" },
      { key: "footer_link_contact", href: "/contact-us" },
    ],
    [t("footer_col_support")]: [
      { key: "footer_link_faq", href: "/faq" },
      { key: "footer_link_risk", href: "/risk" },
      { key: "footer_link_security", href: "/security" },
      { key: "footer_link_cookies", href: "/cookies" },
    ],
    [t("footer_col_legal")]: [
      { key: "footer_link_privacy", href: "/privacy" },
      { key: "footer_link_terms", href: "/terms" },
      { key: "footer_link_disclaimer", href: "/disclaimer" },
      { key: "footer_link_accredited", href: "/accredited" },
    ],
  };

  return (
    <footer className="w-full bg-[#0B1628] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <Link href="/">
            <Image src="/logo/logo-white.png" alt="Specfin Technologies" width={110} height={32} className="h-8 w-auto mb-5" />
          </Link>
          <p className="text-[13px] text-white/40 leading-relaxed mb-4 max-w-[220px]">{t("footer_tagline")}</p>
          <p className="text-[11px] text-white/20 mb-1">Powered by Spectra Protocol</p>
          <p className="text-[11px] text-white/20">Ark Global Co.</p>
        </div>

        {Object.entries(COLS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[11px] font-bold text-white/50 tracking-[0.12em] uppercase mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-[13px] text-white/35 hover:text-[#36E8CA] transition-colors">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-white/5">
        <p className="text-[12px] text-white/20 text-center sm:text-left">{t("footer_copy")}</p>
        <p className="text-[12px] text-white/20 text-center">{t("footer_legal")}</p>
      </div>
    </footer>
  );
}
