"use client";

import { useState } from "react";
import Link from "next/link";

const TIERS = [
  {
    name: "Bronze",
    min: 0, max: 999,
    fee: 30,
    color: "#CD7F32",
    bg: "bg-[#CD7F32]/10",
    border: "border-[#CD7F32]/30",
    perks: ["Standard platform access", "All investment opportunities", "Standard fee schedule"],
  },
  {
    name: "Silver",
    min: 1000, max: 9999,
    fee: 20,
    color: "#9FB6D0",
    bg: "bg-[#9FB6D0]/10",
    border: "border-[#9FB6D0]/30",
    perks: ["20% performance fee (vs 30%)", "Priority listing notifications", "Early access to new rounds"],
  },
  {
    name: "Gold",
    min: 10000, max: Infinity,
    fee: 12.5,
    color: "#EFC878",
    bg: "bg-[#EFC878]/10",
    border: "border-[#EFC878]/30",
    perks: ["10–15% performance fee", "VIP-only trading strategies", "RWA whitelist priority", "Priority allocation on new rounds", "Dedicated support"],
    featured: true,
  },
];

const DIST = [
  { label: "Ecosystem & Rewards", pct: 40, color: "#36E8CA" },
  { label: "Token Sale", pct: 20, color: "#0D3880" },
  { label: "Team & Founders", pct: 15, color: "#9F84FF" },
  { label: "Reserve", pct: 15, color: "#EFC878" },
  { label: "Partners & Advisors", pct: 10, color: "#4fe0a1" },
];

export default function TokenPage() {
  const [profit, setProfit] = useState(10000);
  const [holding, setHolding] = useState(0);

  const currentTier = TIERS.find(t => holding >= t.min && holding <= t.max) || TIERS[0];
  const standardFee = profit * 0.30;
  const currentFee = profit * (currentTier.fee / 100);
  const savings = standardFee - currentFee;

  return (
    <div className="min-h-screen bg-[#030812] text-white pb-20">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#030812] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">Platform Utility Token</p>
          <h1 className="text-[32px] font-bold text-white mb-2">
            Spectra <span className="font-mono text-[#36E8CA]">(SPCR)</span>
          </h1>
          <p className="text-[14px] text-[#9fb6d0] max-w-2xl">
            Hold Spectra to reduce your performance fee, unlock VIP strategies, and get priority access to RWA listings.
            The more you hold, the less you pay.
          </p>
          <p className="text-[11px] text-[#9fb6d0]/50 italic mt-2">
            Note: "Spectra" is the tentative token name — final name to be confirmed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* Fee Calculator */}
        <div className="rounded-2xl border border-[#36E8CA]/20 bg-[#081321] p-6">
          <h2 className="text-[18px] font-bold text-white mb-6">Fee savings calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[12px] font-semibold text-[#9fb6d0] uppercase tracking-wider mb-2">
                Estimated profit (USDT)
              </label>
              <input
                type="number"
                value={profit}
                onChange={e => setProfit(Number(e.target.value))}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[16px] font-mono text-white focus:outline-none focus:border-[#36E8CA]/50"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#9fb6d0] uppercase tracking-wider mb-2">
                Your SPCR holdings
              </label>
              <input
                type="number"
                value={holding}
                onChange={e => setHolding(Number(e.target.value))}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[16px] font-mono text-white focus:outline-none focus:border-[#36E8CA]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.04] rounded-xl p-4 text-center">
              <div className="text-[12px] text-[#9fb6d0] mb-1">Standard fee (30%)</div>
              <div className="font-mono text-[22px] font-bold text-[#ff8d8d]">
                -{standardFee.toLocaleString()} USDT
              </div>
            </div>
            <div className={`rounded-xl p-4 text-center ${currentTier.bg} border ${currentTier.border}`}>
              <div className="text-[12px] text-[#9fb6d0] mb-1">
                Your fee ({currentTier.fee}% · {currentTier.name})
              </div>
              <div className="font-mono text-[22px] font-bold" style={{ color: currentTier.color }}>
                -{currentFee.toLocaleString()} USDT
              </div>
            </div>
            <div className="bg-[#36E8CA]/10 border border-[#36E8CA]/30 rounded-xl p-4 text-center">
              <div className="text-[12px] text-[#9fb6d0] mb-1">You save</div>
              <div className="font-mono text-[22px] font-bold text-[#36E8CA]">
                +{savings.toLocaleString()} USDT
              </div>
            </div>
          </div>

          {savings <= 0 && (
            <p className="text-center text-[13px] text-[#9fb6d0] mt-4">
              Hold 1,000+ SPCR to start saving on performance fees.
            </p>
          )}
        </div>

        {/* Tier cards */}
        <div>
          <h2 className="text-[18px] font-bold text-white mb-5">Fee tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier) => {
              const isActive = currentTier.name === tier.name;
              return (
                <div
                  key={tier.name}
                  className={`rounded-xl border-2 p-6 transition-all ${isActive ? tier.border + " " + tier.bg : "border-white/10 bg-white/[0.03]"}`}
                >
                  {isActive && (
                    <div className="text-[11px] font-bold mb-3 px-2 py-0.5 rounded self-start inline-block" style={{ color: tier.color, backgroundColor: tier.color + "20" }}>
                      ✓ Your current tier
                    </div>
                  )}
                  <div className="font-mono text-[11px] uppercase tracking-wider mb-1" style={{ color: tier.color }}>
                    {tier.name}
                  </div>
                  <div className="text-[12px] text-[#9fb6d0] mb-3">
                    {tier.max === Infinity ? `${tier.min.toLocaleString()}+ SPCR` : `${tier.min.toLocaleString()} – ${tier.max.toLocaleString()} SPCR`}
                  </div>
                  <div className="font-mono text-[36px] font-bold text-white mb-1">{tier.fee}%</div>
                  <div className="text-[12px] text-[#9fb6d0] mb-4">Performance fee</div>
                  <ul className="space-y-2">
                    {tier.perks.map(p => (
                      <li key={p} className="flex items-start gap-2 text-[13px] text-[#9fb6d0]">
                        <span style={{ color: tier.color }} className="mt-0.5 flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Token distribution */}
        <div className="rounded-2xl border border-white/10 bg-[#081321] p-6">
          <h2 className="text-[18px] font-bold text-white mb-2">Token distribution</h2>
          <p className="text-[13px] text-[#9fb6d0] mb-6">Total supply: 1,000,000,000 SPCR</p>
          <div className="space-y-4">
            {DIST.map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-40 text-right text-[13px] text-[#9fb6d0] flex-shrink-0">{item.label}</div>
                <div className="flex-1 bg-white/[0.06] rounded-full h-2.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: item.pct + "%", backgroundColor: item.color }} />
                </div>
                <div className="w-12 text-[13px] font-mono font-bold text-white">{item.pct}%</div>
                <div className="w-32 text-[11px] text-[#9fb6d0] hidden sm:block">
                  {(item.pct * 10000000).toLocaleString()} SPCR
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <h3 className="text-[20px] font-bold text-white mb-3">Ready to upgrade your tier?</h3>
          <p className="text-[14px] text-[#9fb6d0] mb-6 max-w-md mx-auto">
            The Spectra token sale opens soon. Join the waitlist to secure early access at founding investor pricing.
          </p>
          <Link
            href="/spectra-token"
            className="inline-flex items-center px-8 py-4 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] hover:opacity-90 transition"
          >
            Learn about Spectra →
          </Link>
        </div>
      </div>
    </div>
  );
              }
