"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const steps = [
  {
    step: "01",
    stepNumber: "1",
    title: "Create your investor account",
    description: "Register with your email or connect your Web3 wallet. Complete KYC verification. Accredited investors only.",
    img: "/home/how-to-start-invest/create-account.png",
  },
  {
    step: "02",
    stepNumber: "2",
    title: "Browse verified opportunities",
    description: "Explore hedge fund strategies, token sales, and RWA assets. Each listing includes audited financials and on-chain performance data.",
    img: "/home/how-to-start-invest/create-account.png",
  },
  {
    step: "03",
    stepNumber: "3",
    title: "Invest and track in real time",
    description: "Deposit USDT/USDC via wallet, or KRW/USD via bank transfer. Positions recorded on-chain instantly.",
    img: "/home/how-to-start-invest/create-account.png",
  },
];

export default function HowToStartInvestSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const lightDots = useMemo(() =>
    Array.from({ length: 50 }).map((_, i) => {
      const seed = i * 137.508;
      return {
        key: i,
        left: (Math.sin(seed) * 0.5 + 0.5) * 100,
        top: (Math.cos(seed * 0.7) * 0.5 + 0.5) * 100,
        delay: (i * 0.1) % 3,
        duration: 2 + (i % 3) * 0.5,
        size: 4 + (i % 5) * 1.5,
      };
    }), []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-20 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/home/how-to-start-invest/background.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {lightDots.map((dot) => (
            <motion.div
              key={dot.key}
              className="absolute rounded-full"
              style={{
                left: `${dot.left}%`, top: `${dot.top}%`,
                width: `${dot.size}px`, height: `${dot.size}px`,
                background: "radial-gradient(circle, rgba(96,165,224,0.9) 0%, rgba(54,232,202,0.6) 50%, transparent 100%)",
                boxShadow: `0 0 ${dot.size*2}px rgba(96,165,224,0.8)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0,1,0.5,1,0], scale: [0.8,1,0.9,1,0.8] }}
              transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-3">Getting started</p>
          <h2 className="text-[30px] lg:text-[36px] font-bold text-white mb-4">
            How to start investing with Specfin
          </h2>
          <p className="text-[15px] text-white/70 max-w-2xl mx-auto">
            Tokenized ownership may provide optional secondary liquidity. All opportunities are subject to due-diligence and audit review.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {steps.map((step, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_75%] max-w-4xl mx-auto relative">
                  {/* step number sidebar */}
                  <div className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20 hidden lg:flex">
                    <div className="text-6xl font-bold text-white" style={{ writingMode: "vertical-rl" }}>{step.step}</div>
                    <div className="w-px h-16 bg-white/30" />
                    <div className="text-4xl font-bold text-white/30" style={{ writingMode: "vertical-rl" }}>03</div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0.8, scale: selectedIndex === index ? 1 : 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl overflow-hidden"
                  >
                    <div className="relative w-full" style={{ aspectRatio: "844/473" }}>
                      <Image src={step.img} alt={step.title} fill priority />
                      <div className="relative z-10 h-full flex items-center">
                        <div className="p-8 lg:p-10 w-full lg:w-1/2">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                            {step.stepNumber}. {step.title}
                          </h3>
                          <p className="text-sm lg:text-base text-white/90 leading-relaxed drop-shadow-md">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="flex items-center gap-2 mt-5 justify-center">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 ${idx === selectedIndex ? "h-2 w-8 rounded-full bg-white" : "w-2 h-2 rounded-full bg-transparent border border-white"}`}
              />
            ))}
          </div>
        </div>

        {/* Article section — 기존 이미지 활용 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="relative w-full max-w-4xl mx-auto aspect-[16/10] rounded-xl overflow-hidden border-2 border-white/10 mb-10">
            <Image src="/home/how-to-start-invest/article.png" alt="Specfin platform" fill className="object-cover" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <h3 className="text-[24px] lg:text-[28px] font-bold text-white">
              Evaluated by experts. Verified by data. Protected by blockchain.
            </h3>
            <p className="text-[15px] lg:text-[17px] text-white/80 leading-relaxed">
              Specfin curates and evaluates investment opportunities from seed to growth stage through a team of finance analysts, Web3 specialists, and independent blockchain auditors. Only verified and high-potential opportunities are tokenized and offered to investors.
            </p>
            <p className="text-[15px] lg:text-[17px] font-semibold bg-gradient-to-r from-[#60A5E0] to-[#36E8CA] bg-clip-text text-transparent">
              To curate, evaluate, and unlock institutional-grade investment opportunities — through expert due diligence, smart contract automation, and blockchain-powered ownership.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
                                                         }
