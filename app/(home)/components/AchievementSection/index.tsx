"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AchievementSection() {
  return (
    <section className="w-full bg-[#0D3880] border-b border-[#0D3880]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-3">
              Now accepting applications
            </p>
            <h2 className="text-[28px] lg:text-[36px] font-bold text-white mb-4 leading-tight">
              Accepting investor applications for Phase 1
            </h2>
            <p className="text-[16px] text-white/70 max-w-lg leading-relaxed">
              Specfin Technologies is currently onboarding accredited investors for our Hybrid
              Hedge Fund Platform. Join the waitlist to secure early access and reduced
              performance fees as a founding investor.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 lg:items-start"
        >
          <div className="flex flex-wrap gap-6 mb-2">
            {[
              { val: "Phase 1", lbl: "Now accepting" },
              { val: "USDT / KRW", lbl: "Deposit methods" },
              { val: "On-chain", lbl: "Transparency" },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <div className="text-[22px] font-bold text-white">{val}</div>
                <div className="text-[12px] text-white/50">{lbl}</div>
              </div>
            ))}
          </div>
          <Link
            href="/join"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[15px] font-bold bg-white text-[#0D3880] hover:bg-white/90 transition shadow-sm"
          >
            Apply for early access
          </Link>
          <p className="text-[12px] text-white/40">Accredited investors only</p>
        </motion.div>
      </div>
    </section>
  );
}
