import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F9FC] border-b border-[#E8EDF4] py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-bold text-[#00A896] tracking-[0.2em] uppercase mb-2">Legal</p>
          <h1 className="text-[32px] font-bold text-[#0B1628]">Privacy Policy</h1>
          <p className="text-[13px] text-[#4A5568] mt-2">Last updated: June 2026</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5 text-[15px] text-[#4A5568] leading-relaxed">
          <p className="font-semibold text-[#0B1628]">This Privacy Policy is being prepared in compliance with GDPR and PIPA (Korean Personal Information Protection Act). Our legal team is finalizing this document.</p>
          <p>Specfin Technologies (Ark Global Co.) is committed to protecting your personal data. This policy will cover: data we collect, how we use it, retention periods, your rights under GDPR and PIPA, and how to contact our Data Protection Officer.</p>
          <p>In the interim, we commit to: collecting only data necessary for platform operation, never selling your personal data to third parties, using industry-standard encryption for all data at rest and in transit, and complying with all applicable data protection laws in Korea and internationally.</p>
          <p>For data protection enquiries: <a href="mailto:privacy@specfintec.com" className="text-[#0D3880]">privacy@specfintec.com</a></p>
        </div>
      </section>
    </main>
  );
}
