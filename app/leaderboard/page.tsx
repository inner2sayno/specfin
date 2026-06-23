import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Trader Leaderboard" };
export default function Page() {
  const MOCK = [
    { rank: 1, name: "Quant Alpha", ytd: "+42.3%", dd: "8.1%", sharpe: "2.4", aum: "$890K", tier: "🥇" },
    { rank: 2, name: "Seoul Macro", ytd: "+31.7%", dd: "12.4%", sharpe: "1.9", aum: "$1.2M", tier: "🥈" },
    { rank: 3, name: "DeFi Neutral", ytd: "+28.9%", dd: "6.8%", sharpe: "2.1", aum: "$540K", tier: "🥉" },
  ];
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-[#E8EDF4] py-12 text-center px-6 bg-[#F7F9FC]">
        <p className="text-[11px] font-bold text-[#00A896] tracking-[0.2em] uppercase mb-3">Verified Traders</p>
        <h1 className="text-[36px] font-bold text-[#0B1628] mb-3">Trader Leaderboard</h1>
        <p className="text-[15px] text-[#4A5568] max-w-xl mx-auto">Performance records stored on-chain. Verifiable by any investor at any time. Subscribe to mirror trades automatically.</p>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-xl border border-[#E8EDF4] overflow-hidden mb-4">
          <table className="w-full">
            <thead className="bg-[#F7F9FC] border-b border-[#E8EDF4]">
              <tr>{["#","Trader","YTD Return","Max Drawdown","Sharpe","AUM","Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-[#4A5568] uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {MOCK.map(t => (
                <tr key={t.rank} className="border-b border-[#E8EDF4] hover:bg-[#F7F9FC]">
                  <td className="px-4 py-4 text-[14px] font-mono text-[#4A5568]">{t.tier} {t.rank}</td>
                  <td className="px-4 py-4 font-semibold text-[#0B1628]">{t.name}</td>
                  <td className="px-4 py-4 font-mono font-bold text-[#059669]">{t.ytd}</td>
                  <td className="px-4 py-4 font-mono text-[#DC2626]">{t.dd}</td>
                  <td className="px-4 py-4 font-mono text-[#0B1628]">{t.sharpe}</td>
                  <td className="px-4 py-4 font-mono text-[#4A5568]">{t.aum}</td>
                  <td className="px-4 py-4"><Link href="/join" className="px-3 py-1.5 rounded-md text-[12px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition">Subscribe</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-[#4A5568] text-center">Sample data — live leaderboard launches with Phase 1. <Link href="/join" className="text-[#0D3880] underline">Join waitlist →</Link></p>
      </section>
    </main>
  );
}
