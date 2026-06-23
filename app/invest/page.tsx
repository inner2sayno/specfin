import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investment Opportunities",
  description: "Institutional-grade hedge fund strategies, RWA assets, and verified token sales — open to all accredited investors.",
};

const FILTERS = ["All", "Hedge Fund Strategies", "RWA Assets", "Token Sales"];

export default function InvestPage() {
  return (
    <main className="w-full bg-[#060C3C] min-h-screen">
      <section className="border-b border-[#36E8CA]/10 py-16 text-center px-6">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">Investment Opportunities</p>
        <h1 className="text-[36px] lg:text-[48px] font-bold text-white leading-tight mb-4">
          Institutional-grade opportunities,{" "}
          <span className="bg-gradient-to-r from-[#36E8CA] to-[#00A896] bg-clip-text text-transparent">open to all accredited investors</span>
        </h1>
        <p className="text-[16px] text-[#9FB6D0] max-w-2xl mx-auto">
          Every listing is independently audited. All performance records stored on-chain. All opportunities subject to due diligence and audit review.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <span key={f} className={`text-[13px] font-medium px-4 py-1.5 rounded-full border ${f === "All" ? "bg-[#36E8CA] text-[#060C3C] border-[#36E8CA] font-bold" : "border-[#36E8CA]/20 text-[#9FB6D0]"}`}>{f}</span>
          ))}
        </div>
        <div className="py-24 text-center border border-dashed border-[#36E8CA]/15 rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-[#36E8CA]/20 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-[#36E8CA]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-[20px] font-semibold text-white mb-2">New opportunities coming soon</h2>
          <p className="text-[14px] text-[#9FB6D0] mb-6 max-w-sm mx-auto">New opportunities are added regularly. Join the waitlist to be notified first.</p>
          <Link href="/join" className="inline-flex items-center justify-center px-6 py-3 rounded-md text-[14px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition">
            Join the waitlist
          </Link>
        </div>
      </section>
    </main>
  );
          }
