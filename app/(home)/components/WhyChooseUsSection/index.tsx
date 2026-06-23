"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Every offering independently audited",
    desc: "Each listing undergoes strict due diligence of business, financials, legal structure, and smart contract security before being made available to investors.",
    accent: "border-t-[#0D3880]",
    iconBg: "bg-[#0D3880]/8",
    iconColor: "#0D3880",
  },
  {
    d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    title: "All trades recorded on-chain",
    desc: "Every trade is permanently stored on the blockchain — immutable, public, and verifiable by any investor at any time. Zero possibility of data manipulation.",
    accent: "border-t-[#00A896]",
    iconBg: "bg-[#00A896]/8",
    iconColor: "#00A896",
  },
  {
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    title: "Institutional-grade smart contract vaults",
    desc: "Investor funds are held in audited smart contract vaults. Fund managers cannot access capital without meeting pre-defined smart contract conditions.",
    accent: "border-t-[#1A56DB]",
    iconBg: "bg-[#1A56DB]/8",
    iconColor: "#1A56DB",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-white border-b border-[#E8EDF4] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold text-[#00A896] tracking-[0.18em] uppercase mb-3">Why Specfin</p>
          <h2 className="text-[30px] lg:text-[38px] font-bold text-[#0B1628] max-w-2xl mx-auto leading-tight">
            Invest with confidence — verified, audited, safeguarded
          </h2>
          <p className="text-[16px] text-[#4A5568] max-w-2xl mx-auto mt-4 leading-relaxed">
            Every Specfin opportunity undergoes independent due diligence of financials, legal
            structure, and smart contract security. All trading activity is permanently
            recorded on-chain — verifiable by any investor, at any time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-white border border-[#E8EDF4] border-t-4 ${p.accent} rounded-xl p-7 hover:shadow-md transition-all`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${p.iconBg}`}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={p.iconColor} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d={p.d} />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold text-[#0B1628] mb-3">{p.title}</h3>
              <p className="text-[14px] text-[#4A5568] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
