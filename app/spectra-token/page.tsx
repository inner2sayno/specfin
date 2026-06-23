import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spectra Token (SPCR)",
  description: "Spectra (SPCR) is the Specfin platform utility token. Hold Spectra to reduce your performance fee to as low as 10-15%.",
};

const TIERS = [
  { name: "Bronze", holding: "0 – 999 SPCR", fee: "30%", perks: ["Standard platform access", "All investment opportunities"], accent: "border-t-[#CD7F32]", badge: "text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/20" },
  { name: "Silver", holding: "1,000 – 9,999 SPCR", fee: "20%", perks: ["Reduced performance fee", "Priority listing notifications", "All Bronze perks"], accent: "border-t-[#9FB6D0]", badge: "text-[#9FB6D0] bg-[#9FB6D0]/10 border-[#9FB6D0]/20" },
  { name: "Gold", holding: "10,000+ SPCR", fee: "10–15%", perks: ["Lowest performance fee", "VIP-only trading strategies", "RWA whitelist priority", "Early access to new rounds"], accent: "border-t-[#EFC878]", badge: "text-[#EFC878] bg-[#EFC878]/10 border-[#EFC878]/20" },
];

const DIST = [
  { label: "Ecosystem & Rewards", pct: "40%", color: "bg-[#36E8CA]" },
  { label: "Token Sale", pct: "20%", color: "bg-[#0D3880]" },
  { label: "Team & Founders", pct: "15%", color: "bg-[#9F84FF]" },
  { label: "Reserve", pct: "15%", color: "bg-[#EFC878]" },
  { label: "Partners & Advisors", pct: "10%", color: "bg-[#4fe0a1]" },
];

export default function SpectraTokenPage() {
  return (
    <main className="w-full bg-[#060C3C] min-h-screen">
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">Platform Utility Token</p>
        <h1 className="text-[38px] lg:text-[52px] font-bold text-white leading-tight mb-4">
          Spectra <span className="font-mono text-[#36E8CA]">(SPCR)</span>
        </h1>
        <p className="text-[17px] text-[#9FB6D0] leading-relaxed max-w-2xl mx-auto mb-2">
          Spectra is the Specfin platform utility token. Holding it reduces your performance fee, unlocks VIP strategies, and gives you priority access to high-demand RWA listings and new investment rounds.
        </p>
        <p className="text-[12px] text-[#9FB6D0]/50 italic">Tentative name — final name to be confirmed by the Specfin founding team.</p>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-[26px] font-bold text-white text-center mb-8">Fee tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier) => (
            <div key={tier.name} className={`rounded-xl border border-t-4 border-[#36E8CA]/10 ${tier.accent} bg-white/[0.04] p-6 flex flex-col gap-3`}>
              <span className={`self-start text-[11px] font-bold border rounded px-2 py-0.5 ${tier.badge}`}>{tier.name}</span>
              <p className="text-[12px] text-[#9FB6D0]">{tier.holding}</p>
              <div className="font-mono text-[32px] font-bold text-white">{tier.fee}</div>
              <p className="text-[12px] text-[#9FB6D0]">Performance fee</p>
              <ul className="space-y-1.5 mt-2">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] text-[#9FB6D0]">
                    <span className="text-[#36E8CA] mt-0.5">checkmark</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-[26px] font-bold text-white text-center mb-2">Token distribution</h2>
        <p className="text-[13px] text-[#9FB6D0] text-center mb-8">Total supply: 1,000,000,000 SPCR</p>
        <div className="space-y-3">
          {DIST.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-36 text-right text-[13px] text-[#9FB6D0] flex-shrink-0">{item.label}</div>
              <div className="flex-1 bg-white/[0.04] rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
              </div>
              <div className="w-10 text-[13px] font-mono font-bold text-white">{item.pct}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-[#36E8CA]/10 py-16 text-center">
        <h2 className="text-[26px] font-bold text-white mb-3">Get early access to Spectra</h2>
        <p className="text-[15px] text-[#9FB6D0] mb-8 max-w-md mx-auto">Join as an investor and secure your tier before the public token sale opens.</p>
        <Link href="/join" className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition">
          Join now
        </Link>
      </section>
    </main>
  );
}
