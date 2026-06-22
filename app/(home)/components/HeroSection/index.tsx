"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#060C3C]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/hero/background.png"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#060C3C]/80 via-[#060C3C]/60 to-[#0A1550]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-6 h-px bg-gradient-to-r from-[#36E8CA] to-transparent" />
              <span className="text-[11px] font-bold text-[#36E8CA] tracking-[0.22em] uppercase">
                Institutional Hybrid Investment Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[40px] lg:text-[52px] font-bold leading-[1.08] text-white mb-6 tracking-tight"
            >
              The bridge between{" "}
              <span className="bg-gradient-to-r from-[#36E8CA] to-[#00A896] bg-clip-text text-transparent">
                institutional capital
              </span>{" "}
              and digital assets
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[17px] text-[#9FB6D0] leading-[1.75] mb-9 max-w-xl"
            >
              Cash investors and crypto holders. One unified platform.
              Institutional-grade hedge fund strategies, verified on-chain
              trader performance, and tokenized real-world assets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/connect-wallet"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] transition hover:opacity-90"
              >
                Join as Investor
              </Link>
              <Link
                href="/connect-wallet"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-[15px] font-semibold border border-[#36E8CA]/40 text-[#36E8CA] hover:bg-[#36E8CA]/10 transition"
              >
                Connect Wallet
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: terminal chart */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden border border-[#36E8CA]/20 bg-[#030812] p-6 flex flex-col"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(54,232,202,0.07),transparent_70%)] pointer-events-none" />

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
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fe0a1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4fe0a1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,100 C20,95 30,90 50,75 C70,60 80,65 100,55 C120,45 130,50 150,38 C170,26 180,32 200,22 C220,12 230,18 250,10 C270,2 280,8 300,15 C320,22 330,18 350,12 C370,6 385,10 400,8 L400,120 L0,120 Z" fill="url(#cg)" />
              <path d="M0,100 C20,95 30,90 50,75 C70,60 80,65 100,55 C120,45 130,50 150,38 C170,26 180,32 200,22 C220,12 230,18 250,10 C270,2 280,8 300,15 C320,22 330,18 350,12 C370,6 385,10 400,8" fill="none" stroke="#4fe0a1" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="400" cy="8" r="4" fill="#4fe0a1" />
            </svg>

            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {[
                { val: "+18.4%", lbl: "YTD Return", color: "text-[#4fe0a1]" },
                { val: "247", lbl: "Investors", color: "text-[#79dbff]" },
                { val: "Gold", lbl: "Your tier", color: "text-[#4fe0a1]" },
              ].map(({ val, lbl, color }) => (
                <div key={lbl} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5">
                  <div className={`font-mono text-base font-medium ${color}`}>{val}</div>
                  <div className="text-[10px] text-[#9fb6d0] mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 relative w-full h-36 rounded-lg overflow-hidden border border-white/10">
              <Image
                src="/home/hero/product.png"
                alt="Specfin dashboard"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
