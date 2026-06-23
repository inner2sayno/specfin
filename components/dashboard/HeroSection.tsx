"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    eyebrow: "PHASE 1 · NOW LIVE",
    title: "Hedge Fund Strategies, On-Chain",
    description:
      "Subscribe to verified trader strategies and let smart contracts mirror trades proportionally in real time. Every position permanently recorded on-chain — no black boxes.",
    cta: { label: "Browse strategies", href: "/dashboard/opportunities" },
    gradient: "from-[#0D3880] via-[#0a2a60] to-[#081a40]",
  },
  {
    id: 2,
    eyebrow: "SPECTRA TOKEN",
    title: "Hold Spectra. Pay Less.",
    description:
      "Standard investors pay 30% performance fee. Gold tier (10,000+ SPCR) pay just 10–15% — plus VIP-only strategy access and RWA whitelist priority.",
    cta: { label: "Learn about Spectra", href: "/dashboard/token" },
    gradient: "from-[#00A896] via-[#007a6e] to-[#005a52]",
  },
  {
    id: 3,
    eyebrow: "COMING SOON · PHASE 2",
    title: "Real World Assets, Tokenized",
    description:
      "Fractional stakes in Gangnam commercial buildings, fine art, and whiskey cask collections — quarterly USDT dividends, secondary market liquidity, live NAV on-chain.",
    cta: { label: "Join RWA waitlist", href: "/rwa-assets" },
    gradient: "from-[#241046] via-[#1a0a33] to-[#100620]",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const slide = SLIDES[activeIndex];

  useEffect(() => {
    if (isDismissed) return;
    const t = setInterval(() => setActiveIndex(p => (p + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <section className="w-full bg-[#030812] py-6 px-4">
      <div className={`relative w-full rounded-2xl bg-gradient-to-r ${slide.gradient} border border-white/10 overflow-hidden`}>
        {/* Dismiss */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
          aria-label="Dismiss"
        >
          <FiX className="h-4 w-4" />
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-0">
          {/* Content */}
          <div className="flex-1 px-8 py-10 lg:py-12">
            <p className="text-[11px] font-bold text-white/50 tracking-[0.18em] uppercase mb-3">{slide.eyebrow}</p>
            <h2 className="text-[26px] lg:text-[32px] font-bold text-white mb-3 leading-tight">{slide.title}</h2>
            <p className="text-[14px] text-white/75 leading-relaxed mb-6 max-w-lg">{slide.description}</p>
            <Link
              href={slide.cta.href}
              className="inline-flex items-center px-5 py-2.5 rounded-md text-[13px] font-bold bg-white text-[#0B1628] hover:bg-white/90 transition"
            >
              {slide.cta.label} →
            </Link>
          </div>

          {/* Decorative right panel */}
          <div className="hidden lg:flex w-48 h-full flex-col items-center justify-center py-12 gap-3 pr-8">
            <div className="font-mono text-[11px] text-white/30 tracking-widest uppercase">Specfin</div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-[28px] font-bold text-white/20 font-mono">v1</div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 pb-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/30"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
