import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RWA Assets",
  description: "Fractional ownership of tokenized real-world assets. Quarterly USDT dividends. Secondary market liquidity.",
};

const ASSETS = [
  { icon: "🏢", title: "Commercial Real Estate", desc: "Fractional ownership of prime Seoul commercial properties. Quarterly USDT dividend distributions to token holders." },
  { icon: "🎨", title: "Blue-chip Art", desc: "Tokenized ownership of curated fine art pieces with verified provenance. Tradeable on Specfin secondary market." },
  { icon: "🥃", title: "Collectibles & Whiskey Casks", desc: "Fractional stakes in premium whiskey cask collections and physical collectibles with documented appraisals." },
];

export default function RwaAssetsPage() {
  return (
    <main className="w-full bg-[#060C3C] min-h-screen">
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">Real World Assets</p>
        <h1 className="text-[38px] lg:text-[52px] font-bold text-white leading-tight mb-6">
          Own fractions of real assets,{" "}
          <span className="bg-gradient-to-r from-[#36E8CA] to-[#00A896] bg-clip-text text-transparent">on-chain</span>
        </h1>
        <p className="text-[17px] text-[#9FB6D0] leading-relaxed max-w-3xl mx-auto">
          In partnership with licensed Korean securities firms, Specfin tokenizes commercial real estate, blue-chip art, and physical collectibles. Investors own fractional stakes and receive quarterly USDT dividends with secondary market liquidity. Live NAV, on-chain.
        </p>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-5">
        {ASSETS.map((item) => (
          <div key={item.title} className="rounded-xl border border-[#36E8CA]/10 bg-white/[0.04] p-6 flex flex-col gap-3">
            <div className="text-3xl">{item.icon}</div>
            <span className="text-[11px] font-bold text-[#EFC878] bg-[#EFC878]/10 border border-[#EFC878]/20 rounded px-2 py-0.5 self-start">Phase 2</span>
            <h2 className="text-[18px] font-semibold text-white">{item.title}</h2>
            <p className="text-[13px] text-[#9FB6D0] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
      <section className="border-t border-[#36E8CA]/10 py-16 text-center">
        <h2 className="text-[26px] font-bold text-white mb-3">Phase 2 launching soon</h2>
        <p className="text-[15px] text-[#9FB6D0] mb-8 max-w-md mx-auto">Join the waitlist to secure early access with Spectra holder priority.</p>
        <Link href="/join" className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition">
          Apply for early access
        </Link>
      </section>
    </main>
  );
}
