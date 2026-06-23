'use client';

import { useState } from 'react';
import { FiX, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function InvestmentIntroSection() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <section className="w-full bg-[#030812] py-4 px-4">
      <div className="relative w-full rounded-2xl border border-[#36E8CA]/20 bg-gradient-to-r from-[#081321] to-[#0a1a2e] p-6 overflow-hidden">
        {/* Dismiss */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
          aria-label="Dismiss"
        >
          <FiX className="h-4 w-4" />
        </button>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pr-8">
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.15em] uppercase mb-2">
              Getting started
            </p>
            <h3 className="text-[20px] font-bold text-white mb-2">
              Complete your investor profile
            </h3>
            <p className="text-[13px] text-[#9fb6d0] leading-relaxed max-w-lg">
              Verify your KYC, set your investment preferences, and unlock access to all
              available opportunities. Takes under 5 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {[
              { step: "1", label: "KYC Verify", done: false },
              { step: "2", label: "Set preferences", done: false },
              { step: "3", label: "First investment", done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-2 text-[12px]">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${item.done ? "bg-[#36E8CA] text-[#030812]" : "bg-white/10 text-white/50 border border-white/20"}`}>
                  {item.step}
                </div>
                <span className="text-[#9fb6d0]">{item.label}</span>
              </div>
            ))}
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#36E8CA] text-[#030812] text-[13px] font-bold hover:opacity-90 transition ml-2"
            >
              Get started <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
