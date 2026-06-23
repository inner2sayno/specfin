import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Activity Log" };

const DEMO_ACTIVITIES = [
  { id: 1, type: "Investment", desc: "Invested $2,000 USDT in Specfin Alpha Fund I", date: "2026-03-01", status: "Confirmed", color: "text-[#34d399]" },
  { id: 2, type: "Investment", desc: "Invested $3,000 USDT in Spectra Liquidity Fund", date: "2026-04-10", status: "Confirmed", color: "text-[#34d399]" },
  { id: 3, type: "Token Sale", desc: "Participated in Kpop Road $KRST token sale — $300 USDT", date: "2025-11-15", status: "Closed", color: "text-white/50" },
];

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">My Investments</p>
        <h1 className="text-[28px] font-bold text-white mb-2">Activity Log</h1>
        <p className="text-[14px] text-[#9fb6d0]">Every investment, withdrawal, and on-chain transaction — timestamped and verifiable.</p>
      </div>
      <div className="px-4 lg:px-6 py-8">
        <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
          <div className="grid grid-cols-4 bg-white/[0.04] px-5 py-3 text-[11px] font-bold text-[#9fb6d0] uppercase tracking-wider border-b border-white/10">
            <span className="col-span-2">Activity</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {DEMO_ACTIVITIES.map(a => (
            <div key={a.id} className="grid grid-cols-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.03] transition items-center">
              <div className="col-span-2">
                <div className="text-[11px] font-semibold text-[#9fb6d0] uppercase tracking-wide mb-0.5">{a.type}</div>
                <div className="text-[13px] text-white">{a.desc}</div>
              </div>
              <div className="text-[12px] text-[#9fb6d0]">{new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
              <div><span className={"text-[12px] font-semibold " + a.color}>{a.status}</span></div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[#9fb6d0]/60 text-center">
          Demo data only. Real on-chain activity will appear here once you connect your wallet and complete KYC.
        </p>
      </div>
    </div>
  );
}
