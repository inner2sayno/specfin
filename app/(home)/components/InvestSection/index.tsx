"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const FILTERS = ["All", "Hedge Fund Strategies", "RWA Assets", "Token Sales"];

const CARDS = [
  {
    filter: "Hedge Fund Strategies",
    badge: "Hedge Fund Strategy", badgeCls: "bg-[#0D3880]/8 text-[#0D3880] border border-[#0D3880]/20",
    status: "Open", statusCls: "bg-[#059669]/8 text-[#059669] border border-[#059669]/20",
    accentBorder: "border-t-[#0D3880]",
    banner: "/home/invest/royal-banner.png",
    logo: "/home/invest/royal-logo.png",
    title: "Specfin Alpha Fund I — Multi-Strategy Quant",
    desc: "Verified quant professionals manage a multi-strategy fund across crypto and traditional equities. All trades executed via smart contract and recorded on-chain in real time.",
    rows: [
      { lbl: "Min. investment", val: "$500 USDT", cls: "text-[#0B1628]" },
      { lbl: "Status", val: "Accepting investors", cls: "text-[#059669]" },
      { lbl: "Standard fee", val: "30% performance", cls: "text-[#0B1628]" },
      { lbl: "Spectra holder fee", val: "10–15% performance", cls: "text-[#00A896]" },
    ],
    cta: "Invest now", ctaCls: "bg-[#0D3880] text-white hover:bg-[#1a4fa0]",
  },
  {
    filter: "RWA Assets",
    badge: "RWA Asset", badgeCls: "bg-[#00A896]/8 text-[#00A896] border border-[#00A896]/20",
    status: "Open", statusCls: "bg-[#059669]/8 text-[#059669] border border-[#059669]/20",
    accentBorder: "border-t-[#00A896]",
    banner: null, logo: null,
    title: "Gangnam District B — Fractional Commercial Building",
    desc: "Fractional ownership of prime Seoul commercial real estate. Quarterly USDT dividend distributions to token holders. Custodied by licensed Korean securities firm.",
    rows: [
      { lbl: "Min. investment", val: "$1,000 USDT", cls: "text-[#0B1628]" },
      { lbl: "Est. annual yield", val: "7.2% p.a.", cls: "text-[#059669]" },
      { lbl: "Distribution", val: "Quarterly USDT", cls: "text-[#0B1628]" },
      { lbl: "Spectra holder", val: "Priority whitelist access", cls: "text-[#00A896]" },
    ],
    cta: "Invest now", ctaCls: "bg-[#00A896] text-white hover:bg-[#008f80]",
  },
  {
    filter: "Token Sales",
    badge: "Token Sale", badgeCls: "bg-[#D97706]/8 text-[#D97706] border border-[#D97706]/20",
    status: "Allowlist Open", statusCls: "bg-[#D97706]/8 text-[#D97706] border border-[#D97706]/20",
    accentBorder: "border-t-[#1A56DB]",
    banner: "/home/invest/kpoproad-banner.png",
    logo: "/home/invest/kpoproad-logo.png",
    title: "Kpop Road — $KRST",
    desc: "KpopRoad offers 300 exclusive NFTs providing VIP access to K-pop events, rewards, and virtual performances. Built on Solana, verified by Specfin due diligence team.",
    rows: [
      { lbl: "Total raised", val: "$200,000", cls: "text-[#0B1628]" },
      { lbl: "Status", val: "Finished", cls: "text-[#4A5568]" },
      { lbl: "Sale type", val: "Vanguard", cls: "text-[#0B1628]" },
      { lbl: "Spectra holder", val: "Early access to new rounds", cls: "text-[#00A896]" },
    ],
    cta: "View details", ctaCls: "bg-[#F7F9FC] border border-[#E8EDF4] text-[#0B1628] hover:border-[#0D3880]/30",
  },
];

export default function InvestSection() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? CARDS : CARDS.filter(c => c.filter === active);

  return (
    <section className="w-full bg-[#F7F9FC] border-b border-[#E8EDF4] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[30px] lg:text-[36px] font-bold text-[#0B1628] mb-2">Active investment opportunities</h2>
          <p className="text-[14px] text-[#4A5568]">Verified, audited, on-chain — institutional standards for every listing</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`text-[13px] font-medium px-4 py-1.5 rounded-full border transition ${active === f ? "bg-[#0D3880] text-white border-[#0D3880] font-bold" : "border-[#E8EDF4] text-[#4A5568] bg-white hover:border-[#0D3880]/30 hover:text-[#0D3880]"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((card, i) => (
            <motion.div key={card.title} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`flex flex-col rounded-xl overflow-hidden border border-[#E8EDF4] border-t-4 ${card.accentBorder} bg-white hover:shadow-md hover:-translate-y-0.5 transition-all`}>

              {card.banner && (
                <div className="relative w-full h-32 overflow-hidden">
                  <Image src={card.banner} alt={card.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {card.logo && (
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white">
                      <Image src={card.logo} alt="" fill className="object-contain p-1" />
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${card.badgeCls}`}>{card.badge}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${card.statusCls}`}>{card.status}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#0B1628] mb-2 leading-snug">{card.title}</h3>
                <p className="text-[13px] text-[#4A5568] leading-relaxed mb-4 flex-1">{card.desc}</p>
                <div className="border-t border-[#E8EDF4] pt-3 space-y-1.5 mb-4">
                  {card.rows.map(r => (
                    <div key={r.lbl} className="flex justify-between text-[12px]">
                      <span className="text-[#4A5568]">{r.lbl}</span>
                      <span className={`font-semibold ${r.cls}`}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-lg text-[14px] font-bold hover:opacity-90 transition ${card.ctaCls}`}>{card.cta}</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/invest" className="text-[14px] font-semibold text-[#0D3880] border-b border-[#0D3880]/30 pb-0.5 hover:border-[#0D3880] transition">
            See all investment opportunities →
          </a>
        </div>
      </div>
    </section>
  );
}
