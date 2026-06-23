import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Careers" };
export default function CareersPage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <section className="bg-[#0D3880] py-20 px-6 text-center">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">Join us</p>
        <h1 className="text-[38px] lg:text-[48px] font-bold text-white mb-4">Build the future of institutional investment</h1>
        <p className="text-[16px] text-white/70 max-w-xl mx-auto">Specfin is a high-conviction team building the bridge between traditional finance and blockchain. We are hiring across engineering, finance, and operations.</p>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-[#E8EDF4] bg-[#F7F9FC] p-10 text-center">
          <div className="text-5xl mb-5">🚀</div>
          <h2 className="text-[24px] font-bold text-[#0B1628] mb-3">No open positions yet</h2>
          <p className="text-[15px] text-[#4A5568] leading-relaxed mb-8 max-w-md mx-auto">We are building our core team. If you are an exceptional engineer, quant, or finance professional who wants to work on something ambitious, reach out directly.</p>
          <Link href="/contact-us" className="inline-flex items-center px-8 py-4 rounded-md text-[15px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
