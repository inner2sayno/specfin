import InvestmentSection from "../components/InvestmentSection";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Investment Opportunities" };

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">Verified & Audited</p>
          <h1 className="text-[28px] font-bold text-white mb-2">Investment Opportunities</h1>
          <p className="text-[14px] text-[#9fb6d0] leading-relaxed">
            Browse all available hedge fund strategies, tokenized real-world assets, and pre-vetted token sales. Every listing independently audited. All performance records stored on-chain.
          </p>
        </div>
      </div>
      <InvestmentSection variant="opportunities" />
    </div>
  );
}
