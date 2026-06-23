import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Specfin Technologies is a next-generation hybrid investment platform bridging Traditional Finance and Decentralized Finance.",
};

export default function AboutPage() {
  return (
    <main className="w-full bg-[#060C3C] min-h-screen">
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">About Specfin Technologies</p>
        <h1 className="text-[38px] lg:text-[52px] font-bold text-white leading-tight mb-6">
          Redefining who gets access to{" "}
          <span className="bg-gradient-to-r from-[#36E8CA] to-[#00A896] bg-clip-text text-transparent">institutional-grade investment</span>
        </h1>
        <p className="text-[17px] text-[#9FB6D0] leading-relaxed max-w-3xl mx-auto mb-4">
          Specfin Technologies is a next-generation hybrid investment platform built to bridge Traditional Finance (TradFi) and Decentralized Finance (DeFi). We believe institutional-grade returns should not be the exclusive domain of billion-dollar endowments — they should be accessible to any accredited investor, whether they hold cash or crypto.
        </p>
        <p className="text-[17px] text-[#9FB6D0] leading-relaxed max-w-3xl mx-auto">
          Our platform operates a dual-pipeline architecture. Cash investors deposit KRW or USD via bank transfer and access professional trading strategies through a familiar fiat-denominated interface — no crypto wallet required. Crypto investors connect Web3 wallets to deposit USDT or USDC directly into audited smart contract vaults.
        </p>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#36E8CA]/20 bg-white/[0.04] p-8 text-center">
          <p className="text-[12px] font-bold text-[#36E8CA] tracking-[0.15em] uppercase mb-3">Our mission</p>
          <p className="text-[17px] text-white leading-relaxed">
            To make institutional-grade financial instruments accessible, transparent, and trustworthy — combining the security of regulated traditional finance with the irreversible transparency of blockchain technology.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-t-4 border-[#36E8CA]/10 border-t-[#0D3880] bg-white/[0.04] p-8">
          <span className="inline-block text-[11px] font-bold text-[#79dbff] bg-[#0D3880]/40 border border-[#79dbff]/20 rounded px-2 py-0.5 mb-4">Phase 1 · Now</span>
          <h2 className="text-[22px] font-bold text-white mb-3">Hybrid Hedge Fund Platform</h2>
          <p className="text-[15px] text-[#9FB6D0] leading-relaxed">
            Verified traders publish performance history on-chain. Investors browse the leaderboard, subscribe to a strategy, and a smart contract automatically mirrors trades in real time. No black boxes. Every trade permanently recorded and publicly verifiable.
          </p>
        </div>
        <div className="rounded-2xl border border-t-4 border-[#36E8CA]/10 border-t-[#00A896] bg-white/[0.04] p-8">
          <span className="inline-block text-[11px] font-bold text-[#36E8CA] bg-[#00A896]/20 border border-[#36E8CA]/20 rounded px-2 py-0.5 mb-4">Phase 2 · Coming Soon</span>
          <h2 className="text-[22px] font-bold text-white mb-3">RWA Investment Bank</h2>
          <p className="text-[15px] text-[#9FB6D0] leading-relaxed">
            In partnership with licensed Korean securities firms, Specfin will tokenize commercial real estate, blue-chip art, and physical collectibles. Investors own fractional stakes and receive quarterly USDT dividends — with secondary market liquidity. Live NAV, on-chain.
          </p>
        </div>
      </section>
      <section className="border-t border-[#36E8CA]/10 py-16 text-center">
        <h2 className="text-[28px] font-bold text-white mb-4">Ready to invest?</h2>
        <p className="text-[15px] text-[#9FB6D0] mb-8">Join accredited investors accessing institutional-grade opportunities.</p>
        <Link href="/join" className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition">
          Join now
        </Link>
      </section>
    </main>
  );
}
