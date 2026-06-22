"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { src: "/home/partners/kpoproad-logo.png", alt: "Kpop Road" },
  { src: "/home/partners/tvk-logo.png", alt: "tvK" },
  { src: "/home/partners/hana-logo.png", alt: "The Hana" },
  { src: "/home/partners/tiktok-logo.png", alt: "TikTok" },
  { src: "/home/partners/npay-logo.png", alt: "N Pay" },
  { src: "/home/partners/klove-pet-logo.png", alt: "K-Love Pet" },
];

export default function PartnerSection() {
  return (
    <section className="relative w-full bg-[#060C3C] border-y border-[#36E8CA]/10 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11px] font-bold text-[#9FB6D0] tracking-[0.18em] uppercase mb-8">
          Trusted Backers &amp; Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {partners.map((p) => (
            <motion.div
              key={p.alt}
              whileHover={{ scale: 1.05 }}
              className="relative h-12 w-36 rounded-lg bg-white/5 border border-[#36E8CA]/10 hover:border-[#36E8CA]/30 transition-colors overflow-hidden flex items-center justify-center px-4"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-contain p-2"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
