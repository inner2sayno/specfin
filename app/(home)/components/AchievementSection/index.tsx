"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AchievementSection() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[#36E8CA]/15">
      <div className="absolute inset-0 z-0">
        <Image src="/home/achievements/background.png" alt="" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A896]/15 via-[#0A1550]/25 to-[#060C3C]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-3">
              Now accepting applications
            </p>
            <h2 className="text-[28px] lg:text-[34px] font-bold text-white mb-4 leading-tight">
              Accepting investor applications<br />for Phase 1
            </h2>
            <p className="text-[16px] text-[#9FB6D0] max-w-lg leading-relaxed">
              Specfin Technologies is currently onboarding accredited investors for our Hybrid Hedge Fund Platform. Join the waitlist to secure early access and receive priority allocation.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-4 lg:items-start"
        >
          <Link
            href="/connect-wallet"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition"
          >
            Apply for early access
          </Link>
          <p className="text-[12px] text-[#9FB6D0]">Accredited investors only · KYC required</p>
        </motion.div>
      </div>
    </section>
  );
}
