import Link from "next/link";
import Image from "next/image";

const COLS = {
  Platform: [
    { label: "How to Invest", href: "/how-to-invest" },
    { label: "Investment Opportunities", href: "/invest" },
    { label: "RWA Assets", href: "/rwa-assets" },
    { label: "Spectra Token", href: "/spectra-token" },
    { label: "Trader Leaderboard", href: "/leaderboard" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Risk Disclosure", href: "/risk" },
    { label: "Security", href: "/security" },
    { label: "Cookie Settings", href: "/cookies" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "General Disclaimer", href: "/disclaimer" },
    { label: "Accredited Investor Notice", href: "/accredited" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#020712", borderTop: "1px solid rgba(54,232,202,0.10)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link href="/">
            <Image
              src="/logo/logo-white.png"
              alt="Specfin Technologies"
              width={110}
              height={32}
              className="h-8 w-auto mb-4"
            />
          </Link>
          <p className="text-[13px] text-white/40 leading-relaxed mb-4 max-w-[220px]">
            Institutional hybrid investment platform. Traditional Finance meets Decentralized Finance.
          </p>
          <p className="text-[11px] text-white/20 mb-2">Powered by Spectra Protocol</p>
          <p className="text-[11px] text-white/20">Ark Global Co.</p>
        </div>

        {/* Link columns */}
        {Object.entries(COLS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[11px] font-bold text-white/60 tracking-[0.12em] uppercase mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/40 hover:text-[#36E8CA] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[12px] text-white/25 text-center sm:text-left">
          © 2026 Specfin Technologies · Ark Global Co. · All rights reserved.
        </p>
        <p className="text-[12px] text-white/25 text-center">
          Accredited investors only · Not financial advice · Past performance is not indicative of future results
        </p>
      </div>
    </footer>
  );
}
