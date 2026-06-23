import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Specfin Technologies for investor enquiries, partnership opportunities, or platform support.",
};

export default function ContactPage() {
  return (
    <main className="w-full bg-[#060C3C] min-h-screen">
      <section className="max-w-2xl mx-auto px-6 pt-24 pb-20">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">Contact</p>
        <h1 className="text-[36px] lg:text-[44px] font-bold text-white mb-4">Get in touch</h1>
        <p className="text-[16px] text-[#9FB6D0] mb-12">For investor enquiries, partnership opportunities, or platform support.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl border border-[#36E8CA]/10 bg-white/[0.04] p-5">
            <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.1em] uppercase mb-2">General Enquiries</p>
            <p className="text-[14px] text-[#9FB6D0]">contact@specfintec.com</p>
          </div>
          <div className="rounded-xl border border-[#36E8CA]/10 bg-white/[0.04] p-5">
            <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.1em] uppercase mb-2">Investor Relations</p>
            <p className="text-[14px] text-[#9FB6D0]">ir@specfintec.com</p>
          </div>
        </div>
        <div className="rounded-2xl border border-[#36E8CA]/10 bg-white/[0.04] p-8">
          <h2 className="text-[20px] font-semibold text-white mb-6">Send a message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#9FB6D0] uppercase tracking-wider mb-2">Name</label>
              <input type="text" placeholder="Your name" className="w-full bg-white/[0.05] border border-[#36E8CA]/15 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#36E8CA]/50" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#9FB6D0] uppercase tracking-wider mb-2">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full bg-white/[#0.05] border border-[#36E8CA]/15 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#36E8CA]/50" />
            </div>
            <div> 
              <label className="block text-[12px] font-semibold text-[#9FB6D0] uppercase tracking-wider mb-2">Investor type</label>
              <select className="w-full bg-[#060C3C] border border-[#36E8CA]/15 rounded-lg px-4 py-3 text-[14px] text-white/70 focus:outline-none focus:border-[#36E8CA]/50">
                <option value="">Select investor type</option>
                <option value="cash">Cash investor (KRW/USD)</option>
                <option value="crypto">Crypto investor (USDT/USDC)</option>
                <option value="institutional">Institutional investor</option>
                <option value="other">Other enquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#9FB6D0] uppercase tracking-wider mb-2">Message</label>
              <textarea rows={5} placeholder="How can we help you?" className="w-full bg-white/[0.05] border border-[#36E8CA]/15 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#36E8CA]/50 resize-none" />
            </div>
            <button className="w-full py-4 rounded-lg text-[15px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#060C3C] hover:opacity-90 transition">
              Send message
            </button>
          </div>
        </div>
        <p className="text-[12px] text-[#9FB6D0]/50 text-center mt-6">
          Specfin Technologies is not a licensed financial advisor. All communications are for informational purposes only.
        </p>
      </section>
    </main>
  );
}
