import type { Metadata } from "next";
export const metadata: Metadata = { title: "General Disclaimer", description: "Specfin Technologies is not a licensed financial advisor. Nothing on this platform constitutes financial advice. All investment opportunities are provided for informational purposes only. Investors should conduct their own due diligence and consult qualified financial advisors before making any investment decision." };
export default function Page() {
  return (
    <main className="w-full bg-white min-h-screen">
      <section className="bg-[#0B1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-3">Legal</p>
          <h1 className="text-[36px] font-bold text-white">General Disclaimer</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#F7F9FC] border border-[#E8EDF4] rounded-xl p-8 mb-8">
          <p className="text-[15px] text-[#4A5568] leading-relaxed mb-4">Specfin Technologies is not a licensed financial advisor. Nothing on this platform constitutes financial advice. All investment opportunities are provided for informational purposes only. Investors should conduct their own due diligence and consult qualified financial advisors before making any investment decision.</p>
          <p className="text-[14px] text-[#4A5568] leading-relaxed">This document is being prepared by our legal team and will be published before the public launch of Specfin Technologies.</p>
        </div>
        <div className="rounded-xl border border-[#E8EDF4] bg-white p-6">
          <h2 className="text-[18px] font-semibold text-[#0B1628] mb-2">Questions?</h2>
          <p className="text-[14px] text-[#4A5568] mb-3">For enquiries, contact our legal team.</p>
          <a href="mailto:legal@specfintec.com" className="text-[14px] font-semibold text-[#0D3880] hover:underline">legal@specfintec.com</a>
        </div>
        <p className="text-[12px] text-[#4A5568] mt-6 text-center">© 2026 Specfin Technologies · Ark Global Co.</p>
      </section>
    </main>
  );
}
