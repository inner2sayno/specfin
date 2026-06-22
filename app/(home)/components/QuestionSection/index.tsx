"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What is Specfin Technologies?",
    a: "Specfin Technologies is a hybrid investment platform giving accredited investors access to institutional-grade hedge fund strategies and tokenized real-world assets. Cash investors deposit KRW or USD via bank transfer. Crypto investors connect Web3 wallets to deposit USDT or USDC directly. Both investor types access the same opportunities through one unified dashboard.",
  },
  {
    q: "How do I invest using USDT or USDC?",
    a: "Connect your Web3 wallet — MetaMask, Phantom, Coinbase, or any WalletConnect-compatible wallet — on the Join page. Select an investment opportunity, enter your USDT/USDC amount, and approve the smart contract transaction. Your position is recorded on-chain instantly and visible in your dashboard.",
  },
  {
    q: "How do I invest using KRW or USD?",
    a: "Register with your email address and complete KYC verification. Once verified, you can deposit via bank transfer. The platform manages the internal conversion to stablecoins for trading purposes — your dashboard always shows your balance in KRW or USD.",
  },
  {
    q: "What is the Spectra token and why should I hold it?",
    a: "Spectra (SPCR) is the Specfin platform utility token. Holding it reduces your performance fee: standard investors pay 30%, Silver tier (1,000+ SPCR) pay 20%, and Gold tier (10,000+ SPCR) pay just 10–15%. Spectra holders also get early access to high-demand RWA listings, VIP-only trading strategies, and priority allocation on new investment rounds.",
  },
  {
    q: "What real-world assets can I invest in through Specfin?",
    a: "Phase 1 (now): hedge fund strategies and verified token sales. Phase 2 (launching with licensed Korean securities firm partners): fractional commercial real estate in Seoul, blue-chip art and collectibles, whiskey cask collections, and music copyright royalties — all as fractional tradeable tokens with secondary market liquidity.",
  },
];

export default function QuestionSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-[#060C3C]/60 border-t border-[#36E8CA]/10 py-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] lg:text-[38px] font-bold text-white text-center mb-12"
        >
          Frequently asked questions
        </motion.h2>

        <div className="space-y-0">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-[#36E8CA]/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left gap-4"
              >
                <span className="text-[16px] font-semibold text-white">{item.q}</span>
                <span className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border text-[18px] transition-all duration-200 ${open === i ? "bg-[#36E8CA] border-[#36E8CA] text-[#060C3C] rotate-45" : "bg-[#36E8CA]/10 border-[#36E8CA]/30 text-[#36E8CA]"}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[15px] text-[#9FB6D0] leading-[1.7] pb-5">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
