import type { Metadata } from "next";
import { PORTFOLIO_HOLDINGS } from "@/lib/specfinData";
import Link from "next/link";

export const metadata: Metadata = { title: "Holdings" };

function fmt(n: number): string { return "$" + n.toLocaleString(); }

export default function HoldingsPage() {
  const totalInvested = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.invested, 0);
  const totalCurrent = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.currentValue, 0);
  const totalReturn = ((totalCurrent - totalInvested) / totalInvested) * 100;
  const active = PORTFOLIO_HOLDINGS.filter(h => h.status === "Active");
  const totalPnL = totalCurrent - totalInvested;

  const kpis = [
    { label: "Total invested", value: fmt(totalInvested), sub: "USDT", color: "text-white" },
    { label: "Current value", value: fmt(totalCurrent), sub: "USDT", color: "text-white" },
    { label: "Total P&L", value: (totalPnL >= 0 ? "+" : "") + fmt(Math.abs(totalPnL)), sub: totalReturn.toFixed(1) + "%", color: totalReturn >= 0 ? "text-[#34d399]" : "text-[#f87171]" },
    { label: "Active positions", value: String(active.length), sub: "of " + PORTFOLIO_HOLDINGS.length + " total", color: "text-white" },
  ];

  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">My Investments</p>
        <h1 className="text-[28px] font-bold text-white mb-2">Holdings</h1>
        <p className="text-[14px] text-[#9fb6d0]">All your active and past investment positions. Updated in real time via on-chain data.</p>
      </div>
      <div className="px-4 lg:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map(k => (
            <div key={k.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
              <div className="text-[12px] text-[#9fb6d0] mb-1">{k.label}</div>
              <div className={"text-[22px] font-bold font-mono " + k.color}>{k.value}</div>
              <div className="text-[11px] text-[#9fb6d0]">{k.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden mb-4">
          <div className="hidden md:grid md:grid-cols-6 bg-white/[0.04] px-5 py-3 text-[11px] font-bold text-[#9fb6d0] uppercase tracking-wider border-b border-white/10">
            <span className="col-span-2">Investment</span>
            <span>Invested</span>
            <span>Current Value</span>
            <span>Return</span>
            <span>Status</span>
          </div>
          {PORTFOLIO_HOLDINGS.map(item => (
            <div key={item.id} className="flex flex-col md:grid md:grid-cols-6 px-5 py-4 border-b border-white/5 hover:bg-white/[0.03] transition gap-2 md:gap-0 md:items-center">
              <div className="md:col-span-2">
                <div className="text-[14px] font-semibold text-white">{item.name}</div>
                <div className="text-[11px] text-[#9fb6d0]">{item.type} · Since {new Date(item.since).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
              </div>
              <div className="font-mono text-[13px] text-white">{fmt(item.invested)}</div>
              <div className="font-mono text-[13px] text-white">{fmt(item.currentValue)}</div>
              <div className={"font-mono text-[13px] font-bold " + (item.returnPct >= 0 ? "text-[#34d399]" : "text-[#f87171]")}>
                {item.returnPct >= 0 ? "+" : ""}{item.returnPct}%
              </div>
              <div>
                <span className={"text-[11px] font-semibold px-2 py-0.5 rounded " + (item.status === "Active" ? "bg-[#059669]/15 text-[#34d399] border border-[#059669]/30" : "bg-white/5 text-white/40 border border-white/10")}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-[12px] text-[#9fb6d0]/60">Demo data. Connect wallet or complete KYC to see real portfolio.</p>
          <Link href="/dashboard/opportunities" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80">Browse opportunities →</Link>
        </div>
      </div>
    </div>
  );
                                                                                                             }
