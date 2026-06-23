import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "These Terms of Service govern your use of the Specfin Technologies platform. By creating an account or accessing our services, you agree to these terms. Specfin is available to accredited investors only. All investments carry risk and past performance is not indicative of future results.",
};

export default function Page() {
  return (
    <main className="w-full bg-white min-h-screen">
      <section className="bg-[#0B1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-3">Legal</p>
          <h1 className="text-[36px] font-bold text-white">Terms of Service</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#F7F9FC] border border-[#E8EDF4] rounded-xl p-8 mb-8">
          <p className="text-[15px] text-[#4A5568] leading-relaxed mb-4">These Terms of Service govern your use of the Specfin Technologies platform. By creating an account or accessing our services, you agree to these terms. Specfin is available to accredited investors only. All investments carry risk and past performance is not indicative of future results.</p>
          <p className="text-[14px] text-[#4A5568] leading-relaxed">
            This document is currently being prepared by our legal team. The full document will be published prior to the public launch of Specfin Technologies.
          </p>
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
