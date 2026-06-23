"use client";
import { useParams } from "next/navigation";
import { OPPORTUNITIES } from "@/lib/specfinData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function toM(n: number) { return n >= 1000000 ? (n/1000000).toFixed(1)+"M" : (n/1000).toFixed(0)+"K"; }

export default function OpportunityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const opp = OPPORTUNITIES.find(o => o.slug === slug);
  const [invested, setInvested] = useState(false);
  const [amount, setAmount] = useState("");
  const pct = opp ? Math.min((opp.raised / opp.target) * 100, 100) : 0;

  if (!opp) return (
    <div className="min-h-screen bg-[#030812] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-[22px] font-bold mb-2">Opportunity not found</h1>
        <Link href="/dashboard/opportunities" className="text-[#36E8CA] hover:opacity-80">← Back to opportunities</Link>
      </div>
    </div>
  );

  const statusCls: Record<string,string> = {
    open:"bg-[#059669]/15 text-[#34d399] border border-[#059669]/30",
    closed:"bg-white/5 text-white/40 border border-white/10",
    "coming-soon":"bg-[#D97706]/15 text-[#fbbf24] border border-[#D97706]/30",
  };

  const statsRows = [
    {label:"Min. investment",value:opp.minInvestment},
    {label:"Target return",value:opp.returnTarget},
    {label:"Performance fee",value:opp.fee},
    {label:"Sector",value:opp.sector},
    {label:"Stage",value:opp.stage},
    ...(opp.investors ? [{label:"Investors",value:String(opp.investors)}] : []),
    ...(opp.daysLeft ? [{label:"Days left",value:String(opp.daysLeft)+" days"}] : []),
  ];

  return (
    <div className="min-h-screen bg-[#030812] text-white">
      {/* Banner */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image src={opp.banner} alt={opp.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030812] via-[#030812]/40 to-transparent" />
        <Link href="/dashboard/opportunities" className="absolute top-4 left-4 text-[12px] font-semibold text-white/70 hover:text-white flex items-center gap-1 z-10">
          ← Back
        </Link>
        <div className="absolute bottom-5 left-6 flex items-end gap-4 z-10">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 bg-[#030812] flex-shrink-0">
            <Image src={opp.logo} alt="" fill className="object-contain p-2" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-white leading-tight">{opp.title}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[12px] font-bold px-2 py-0.5 rounded" style={{color:"#36E8CA",backgroundColor:"#36E8CA20"}}>{opp.badge}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${statusCls[opp.status]}`}>{opp.statusLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-[16px] font-bold text-white mb-3">Overview</h2>
            <p className="text-[14px] text-[#9fb6d0] leading-relaxed">{opp.description}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-[16px] font-bold text-white mb-4">Key highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opp.highlights.map((h: string) => (
                <div key={h} className="flex items-start gap-2 text-[13px] text-[#9fb6d0]">
                  <span className="text-[#36E8CA] mt-0.5 flex-shrink-0">✓</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {opp.tags.map((tag: string) => (
              <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-white/15 text-[#9fb6d0]">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right: invest */}
        <div className="flex flex-col gap-4">
          {opp.raised > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex justify-between text-[12px] text-[#9fb6d0] mb-2">
                <span>Raised</span>
                <span>{pct.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/[0.08] rounded-full h-2 mb-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00A896] to-[#36E8CA]" style={{width:pct+"%"}} />
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="font-mono font-bold text-white">{toM(opp.raised){'}'} raised</span>
                <span className="text-[#9fb6d0]">{toM(opp.target){'}'} target</span>
              </div>
            </div>
          )}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-3">
            {statsRows.map(row=>(
              <div key={row.label} className="flex items-center justify-between text-[13px]">
                <span className="text-[#9fb6d0]">{row.label}</span>
                <span className="font-semibold text-white text-right ml-3">{row.value}</span>
              </div>
            ))}
          </div>
          {opp.status==="open" && !invested && (
            <div className="rounded-xl border border-[#36E8CA]/30 bg-[#081321] p-5">
              <h3 className="text-[15px] font-bold text-white mb-3">Invest now</h3>
              <input type="number" placeholder="Amount (USDT)" value={amount} onChange={e=>setAmount(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#36E8CA]/50 mb-3" />
              <button onClick={()=>{if(amount)setInvested(true);}}
                className="w-full py-3 rounded-lg text-[14px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] hover:opacity-90 transition">
                {amount ? "Invest $"+amount+" USDT" : "Enter amount above"}
              </button>
              <p className="text-[11px] text-[#9fb6d0]/60 mt-3 text-center">Connect wallet or complete KYC to invest</p>
            </div>
          )}
          {opp.status==="open" && invested && (
            <div className="rounded-xl border border-[#059669]/30 bg-[#059669]/10 p-5 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-[15px] font-bold text-[#34d399] mb-1">Investment submitted!</h3>
              <p className="text-[12px] text-[#9fb6d0]">Your position will be confirmed once KYC is complete and payment is processed.</p>
            </div>
          )}
          {opp.status==="coming-soon" && (
            <div className="rounded-xl border border-[#D97706]/30 bg-[#D97706]/10 p-5 text-center">
              <h3 className="text-[14px] font-bold text-[#fbbf24] mb-2">Phase 2 — Join waitlist</h3>
              <p className="text-[12px] text-[#9fb6d0] mb-3">Secure priority access to this opportunity when Phase 2 launches.</p>
              <button className="w-full py-2.5 rounded-lg text-[13px] font-bold border border-[#fbbf24]/40 text-[#fbbf24] hover:bg-[#fbbf24]/10 transition">
                Join waitlist
              </button>
            </div>
          )}
          {opp.status==="closed" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <h3 className="text-[14px] font-semibold text-white/50 mb-2">This opportunity is closed</h3>
              <Link href="/dashboard/opportunities" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80">
                Browse open opportunities →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
            }
