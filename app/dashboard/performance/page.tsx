import type { Metadata } from "next";
import { PORTFOLIO_HOLDINGS } from "@/lib/specfinData";

export const metadata: Metadata = { title: "Portfolio Performance" };

function fmt(n: number): string { return "$" + n.toLocaleString(); }

const CHART_DATA = [
  { month: "Jan", value: 5000 }, { month: "Feb", value: 5180 }, { month: "Mar", value: 5420 },
  { month: "Apr", value: 5310 }, { month: "May", value: 5680 }, { month: "Jun", value: 6001 },
];

export default function PerformancePage() {
  const totalInvested = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.invested, 0);
  const totalCurrent = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.currentValue, 0);
  const totalReturn = ((totalCurrent - totalInvested) / totalInvested) * 100;
  const max = Math.max(...CHART_DATA.map(d => d.value));
  const min = Math.min(...CHART_DATA.map(d => d.value));
  const activeHoldings = PORTFOLIO_HOLDINGS.filter(h => h.status === "Active");

  const kpis = [
    { label: "Total invested", value: fmt(totalInvested), color: "text-white" },
    { label: "Current value", value: fmt(totalCurrent), color: "text-white" },
    { label: "Overall return", value: (totalReturn >= 0 ? "+" : "") + totalReturn.toFixed(1) + "%", color: totalReturn >= 0 ? "text-[#34d399]" : "text-[#f87171]" },
  ];

  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">My Investments</p>
        <h1 className="text-[28px] font-bold text-white mb-2">Portfolio Performance</h1>
        <p className="text-[14px] text-[#9fb6d0]">Track your overall returns and compare performance across your active investments.</p>
      </div>
      <div className="px-4 lg:px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {kpis.map(k => (
            <div key={k.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
              <div className="text-[12px] text-[#9fb6d0] mb-1">{k.label}</div>
              <div className={"text-[24px] font-bold font-mono " + k.color}>{k.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-white">Portfolio value — 2026 (USDT)</h2>
            <span className="text-[11px] text-[#9fb6d0]">Jan – Jun 2026</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {CHART_DATA.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md bg-gradient-to-t from-[#00A896] to-[#36E8CA]"
                  style={{ height: ((d.value - min) / (max - min) * 80 + 20) + "%" }} />
                <span className="text-[10px] text-[#9fb6d0]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-5 bg-white/[0.04] px-5 py-3 text-[11px] font-bold text-[#9fb6d0] uppercase tracking-wider border-b border-white/10">
            <span className="col-span-2">Investment</span>
            <span>Invested</span>
            <span>Current</span>
            <span>YTD Return</span>
          </div>
          {activeHoldings.map(item => (
            <div key={item.id} className="grid grid-cols-5 px-5 py-4 border-b border-white/5 hover:bg-white/[0.03] transition items-center">
              <div className="col-span-2">
                <div className="text-[14px] font-semibold text-white">{item.name}</div>
                <div className="text-[11px] text-[#9fb6d0]">{item.type}</div>
              </div>
              <div className="font-mono text-[13px] text-white">{fmt(item.invested)}</div>
              <div className="font-mono text-[13px] text-white">{fmt(item.currentValue)}</div>
              <div className={"font-mono text-[14px] font-bold " + (item.returnPct >= 0 ? "text-[#34d399]" : "text-[#f87171]")}>
                {item.returnPct >= 0 ? "+" : ""}{item.returnPct}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
