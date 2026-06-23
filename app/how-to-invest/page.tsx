import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "How to Invest" };
const STEPS = [
  { n: "01", title: "Create your investor account", desc: "Register with your email or connect your Web3 wallet. Select your investor type (cash or crypto) and complete KYC verification. Accredited investors only." },
  { n: "02", title: "Browse verified opportunities", desc: "Explore hedge fund strategies, token sales, and RWA assets. Each listing includes audited financials, on-chain performance data, and full due diligence documentation." },
  { n: "03", title: "Invest and track in real time", desc: "Deposit USDT/USDC via wallet, or KRW/USD via bank transfer. Positions recorded on-chain instantly. Track performance, manage portfolio, and download tax reports from your dashboard." },
];
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F9FC] border-b border-[#E8EDF4] py-16 text-center px-6">
        <p className="text-[11px] font-bold text-[#00A896] tracking-[0.2em] uppercase mb-3">Getting Started</p>
        <h1 className="text-[36px] font-bold text-[#0B1628] mb-3">How to start investing with Specfin</h1>
        <p className="text-[15px] text-[#4A5568] max-w-2xl mx-auto">All opportunities are subject to due-diligence and audit review. Accredited investors only.</p>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0D3880] text-white flex items-center justify-center font-bold text-[18px]">{s.n}</div>
              <div className="flex-1 pt-2">
                <h2 className="text-[20px] font-bold text-[#0B1628] mb-2">{s.title}</h2>
                <p className="text-[15px] text-[#4A5568] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/join" className="inline-flex items-center px-8 py-4 rounded-md text-[15px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition">Start investing now →</Link>
        </div>
      </section>
    </main>
  );
}
