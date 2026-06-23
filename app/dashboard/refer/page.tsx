import type { Metadata } from "next";
export const metadata: Metadata = { title: "Refer a Friend" };
export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#030812] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-3">Referral Program</p>
        <h1 className="text-[28px] font-bold text-white mb-3">Refer a Friend</h1>
        <p className="text-[14px] text-[#9fb6d0] mb-10 leading-relaxed">Invite accredited investors to Specfin and earn rewards when they make their first investment. The Specfin referral program launches with Phase 1.</p>
        <div className="rounded-2xl border border-[#36E8CA]/20 bg-[#081321] p-8 text-center mb-8">
          <div className="text-5xl mb-4">🎁</div>
          <h2 className="text-[20px] font-bold text-white mb-2">Referral rewards launching soon</h2>
          <p className="text-[14px] text-[#9fb6d0] max-w-md mx-auto mb-6">When the referral program launches, your unique link will appear here. Referees who invest get reduced fees — you earn bonus Spectra tokens.</p>
          <div className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3">
            <span className="text-[13px] text-[#9fb6d0] flex-1">specfintec.com/join?ref=YOUR_CODE</span>
            <span className="text-[12px] font-bold text-[#36E8CA]/50 border border-[#36E8CA]/20 px-3 py-1 rounded">Coming soon</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Share your link", desc: "Send your unique referral link to accredited investors." },
            { step: "2", title: "They join and invest", desc: "Your referee signs up and makes their first investment." },
            { step: "3", title: "Both earn rewards", desc: "You earn Spectra tokens. They get reduced first-investment fees." },
          ].map(item => (
            <div key={item.step} className="bg-white/[0.04] border border-white/10 rounded-xl p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-[#36E8CA]/15 border border-[#36E8CA]/30 text-[#36E8CA] text-[13px] font-bold flex items-center justify-center mx-auto mb-3">{item.step}</div>
              <h3 className="text-[14px] font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-[12px] text-[#9fb6d0]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
