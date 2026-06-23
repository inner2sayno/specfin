import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Pending Investments" };

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">My Investments</p>
        <h1 className="text-[28px] font-bold text-white mb-2">Pending</h1>
        <p className="text-[14px] text-[#9fb6d0]">Investments awaiting on-chain confirmation or KYC verification.</p>
      </div>
      <div className="px-4 lg:px-6 py-20 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl mb-5">⏳</div>
        <h2 className="text-[20px] font-semibold text-white mb-2">No pending investments</h2>
        <p className="text-[14px] text-[#9fb6d0] max-w-md mb-8 leading-relaxed">
          Once you submit an investment, it will appear here while awaiting on-chain confirmation and KYC verification. Processing typically takes 1–2 business days.
        </p>
        <Link href="/dashboard/opportunities" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] text-[14px] font-bold hover:opacity-90 transition">
          Browse opportunities →
        </Link>
      </div>
    </div>
  );
}
