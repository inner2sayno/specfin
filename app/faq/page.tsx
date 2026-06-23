import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "FAQ" };
const FAQS = [
  { q: "What is Specfin Technologies?", a: "Specfin Technologies is a hybrid investment platform giving accredited investors access to institutional-grade hedge fund strategies and tokenized real-world assets. Cash investors deposit KRW or USD via bank transfer. Crypto investors connect Web3 wallets to deposit USDT or USDC directly." },
  { q: "Who can invest on Specfin?", a: "Specfin is open to accredited investors only. You must complete KYC verification before accessing investment opportunities. Both cash investors (KRW/USD) and crypto investors (USDT/USDC) are welcome." },
  { q: "How do I invest using USDT or USDC?", a: "Connect your Web3 wallet — MetaMask, Phantom, Coinbase, or any WalletConnect-compatible wallet. Select an opportunity, enter your amount, and approve the smart contract transaction. Your position is recorded on-chain instantly." },
  { q: "How do I invest using KRW or USD?", a: "Register with your email and complete KYC verification. Once verified, deposit via bank transfer. The platform manages internal conversion to stablecoins for trading — your dashboard shows your balance in KRW or USD." },
  { q: "What is the Spectra token?", a: "Spectra (SPCR) is the Specfin platform utility token. Holding it reduces your performance fee: standard 30%, Silver tier (1,000+) 20%, Gold tier (10,000+) 10-15%. Holders get early access to RWA listings and VIP strategies." },
  { q: "What real-world assets are available?", a: "Phase 1: hedge fund strategies and verified token sales. Phase 2 with licensed Korean securities firm partners: fractional commercial real estate in Seoul, blue-chip art, whiskey cask collections, and music copyright royalties." },
  { q: "Is my investment secure?", a: "Investor funds are held in audited smart contract vaults. Fund managers cannot access capital without meeting pre-defined smart contract conditions. All trading is permanently recorded on-chain and verifiable by any investor." },
];
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F9FC] border-b border-[#E8EDF4] py-12 text-center px-6">
        <p className="text-[11px] font-bold text-[#00A896] tracking-[0.2em] uppercase mb-3">Help Center</p>
        <h1 className="text-[36px] font-bold text-[#0B1628] mb-3">Frequently Asked Questions</h1>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5">
          {FAQS.map((item, i) => (
            <div key={i} className="border border-[#E8EDF4] rounded-xl p-6">
              <h2 className="text-[16px] font-bold text-[#0B1628] mb-2">{item.q}</h2>
              <p className="text-[14px] text-[#4A5568] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-[14px] text-[#4A5568] mb-4">Still have questions?</p>
          <Link href="/contact-us" className="inline-flex items-center px-6 py-3 rounded-md text-[14px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition">Contact us</Link>
        </div>
      </section>
    </main>
  );
}
