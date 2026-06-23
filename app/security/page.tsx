import type { Metadata } from "next";
export const metadata: Metadata = { title: "Security" };
export default function Page() {
  return (
    <main className="w-full bg-white min-h-screen">
      <section className="bg-[#0B1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-3">Legal</p>
          <h1 className="text-[36px] font-bold text-white">Security</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: "🔒", title: "Smart contract audits", desc: "All investment vaults undergo independent smart contract security audits before deployment." },
            { icon: "🛡️", title: "Multi-signature controls", desc: "Fund manager withdrawals require multi-signature approval and pre-defined contract conditions." },
            { icon: "🔐", title: "End-to-end encryption", desc: "All personal data and communications are encrypted in transit and at rest." },
            { icon: "🔍", title: "Penetration testing", desc: "Regular penetration testing and security assessments by independent security firms." },
          ].map(item => (
            <div key={item.title} className="bg-[#F7F9FC] border border-[#E8EDF4] rounded-xl p-6">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-[16px] font-semibold text-[#0B1628] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#E8EDF4] bg-white p-6">
          <h2 className="text-[18px] font-semibold text-[#0B1628] mb-2">Report a vulnerability</h2>
          <p className="text-[14px] text-[#4A5568] mb-3">If you discover a security vulnerability, please contact us immediately.</p>
          <a href="mailto:security@specfintec.com" className="text-[14px] font-semibold text-[#0D3880] hover:underline">security@specfintec.com</a>
        </div>
      </section>
    </main>
  );
}
