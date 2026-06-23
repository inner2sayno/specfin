"use client";

import Image from "next/image";

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
    <section className="w-full bg-[#F7F9FC] border-b border-[#E8EDF4] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11px] font-bold text-[#4A5568] tracking-[0.18em] uppercase mb-8">
          Trusted Backers & Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {partners.map((p) => (
            <div
              key={p.alt}
              className="relative h-12 w-36 rounded-lg bg-white border border-[#E8EDF4] hover:border-[#0D3880]/20 hover:shadow-sm transition-all overflow-hidden flex items-center justify-center px-4"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
