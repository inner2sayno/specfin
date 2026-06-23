"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-white border-b border-[#E8EDF4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-6 h-px bg-[#00A896]" />
              <span className="text-[11px] font-bold text-[#00A896] tracking-[0.22em] uppercase">
                Institutional Hybrid Investment Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[40px] lg:text-[54px] font-bold leading-[1.06] text-[#0B1628] mb-6 tracking-tight"
            >
              The bridge between{" "}
              <span className="text-[#0D3880]">institutional capital</span>{" "}
              and digital assets
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[17px] text-[#4A5568] leading-[1.75] mb-9 max-w-xl"
            >
              Cash investors and crypto holders. One unified platform.
              Institutional-grade hedge fund strategies, verified on-chain
              trader performance, and tokenized real-world assets — accessible
              to any accredited investor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/join"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-[15px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition shadow-sm"
              >
                Join as Investor
              </Link>
              <Link
                href="/connect-wallet"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-[15px] font-semibold border border-[#E8EDF4] text-[#0B1628] hover:border-[#0D3880]/40 hover:text-[#0D3880] transition"
              >
                Connect Wallet
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              {[
                { icon: "🔒", label: "Smart contract vaults" },
                { icon: "⛓️", label: "On-chain transparency" },
                { icon: "✅", label: "Independent audits" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-[13px] text-[#4A5568]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: terminal chart — keep dark */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative rounded-2xl overflow-hidden border border-[#E8EDF4] shadow-xl bg-[#030812] p-6 flex flex-col"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,56,128,0.12),transparent_70%)] pointer-events-none" />

            <div className="flex justify-between items-center mb-5">
              <span className="font-mono text-[11px] text-[#9fb6d0] tracking-[0.12em] uppercase">Portfolio performance</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#4fe0a1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fe0a1] animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="font-mono text-[30px] font-medium text-white mb-1">$4,284,700</div>
            <div className="font-mono text-[11px] text-[#9fb6d0] mb-5">Total AUM under management</div>

            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-28">
              <defs>
                <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fe0a1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4fe0a1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,100 C20,95 30,90 50,75 C70,60 80,65 100,55 C120,45 130,50 150,38 C170,26 180,32 200,22 C220,12 230,18 250,10 C270,2 280,8 300,15 C320,22 330,18 350,12 C370,6 385,10 400,8 L400,120 L0,120 Z" fill="url(#cg2)" />
              <path d="M0,100 C20,95 30,90 50,75 C70,60 80,65 100,55 C120,45 130,50 150,38 C170,26 180,32 200,22 C220,12 230,18 250,10 C270,2 280,8 300,15 C320,22 330,18 350,12 C370,6 385,10 400,8" fill="none" stroke="#4fe0a1" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="400" cy="8" r="4" fill="#4fe0a1" />
            </svg>

            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {[
                { val: "+18.4%", lbl: "YTD Return", color: "text-[#4fe0a1]" },
                { val: "247", lbl: "Investors", color: "text-[#79dbff]" },
                { val: "Gold", lbl: "Your tier", color: "text-[#EFC878]" },
              ].map(({ val, lbl, color }) => (
                <div key={lbl} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5">
                  <div className={`font-mono text-base font-medium ${color}`}>{val}</div>
                  <div className="text-[10px] text-[#9fb6d0] mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-[11px] text-[#9fb6d0] text-center">
                Phase 1 · Accepting accredited investors
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
