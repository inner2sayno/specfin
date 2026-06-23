"use client";
import { useParams } from "next/navigation";
import { OPPORTUNITIES } from "@/lib/specfinData";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { InvestModal } from "@/components/InvestModal";

function toM(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  return (n / 1000).toFixed(0) + "K";
}

export default function OpportunityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const opp = OPPORTUNITIES.find(o => o.slug === slug);
  const [showModal, setShowModal] = useState(false);
  const pct = opp ? Math.min((opp.raised / opp.target) * 100, 100) : 0;

  // Fetch live product data from API to get real productId
  const [apiProduct, setApiProduct] = useState<{id:string;title:string;minInvestment:number;currency:string;acceptedPayments:string[];status:string}|null>(null);
  useEffect(() => {
    if (!slug) return;
    fetch("/api/products")
      .then(r => r.json())
      .then(data => {
        const found = (data.products || []).find((p: {slug:string}) => p.slug === slug);
        if (found) setApiProduct(found);
      })
      .catch(() => {});
  }, [slug]);

  if (!opp) return (
    <div className="min-h-screen bg-[#030812] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-[22px] font-bold mb-2">Opportunity not found</h1>
        <Link href="/dashboard/opportunities" className="text-[#36E8CA] hover:opacity-80">Back to opportunities</Link>
      </div>
    </div>
  );

  const statusCls: Record<string, string> = {
    open: "bg-[#059669]/15 text-[#34d399] border border-[#059669]/30",
    closed: "bg-white/5 text-white/40 border border-white/10",
    "coming-soon": "bg-[#D97706]/15 text-[#fbbf24] border border-[#D97706]/30",
  };

  const statsRows = [
    { label: "Min. investment", value: opp.minInvestment },
    { label: "Stage", value: opp.stage },
    { label: "Sector", value: opp.sector },
    { label: "Fee structure", value: opp.fee },
    { label: "Return target", value: opp.returnTarget },
    ...(opp.investors ? [{ label: "Investors", value: String(opp.investors) + " registered" }] : []),
    ...(opp.daysLeft ? [{ label: "Days left", value: opp.daysLeft + " days" }] : []),
  ];

  // Build product object for InvestModal - prefer live API data, fallback to specfinData
  const modalProduct = apiProduct ? {
    id: apiProduct.id,
    title: apiProduct.title,
    minInvestment: apiProduct.minInvestment,
    currency: apiProduct.currency,
    acceptedPayments: apiProduct.acceptedPayments,
  } : {
    id: opp.slug,
    title: opp.title,
    minInvestment: typeof opp.minInvestment === "string" ? 5000 : Number(String(opp.minInvestment).replace(/[^0-9]/g, "")) || 5000,
    currency: "USD",
    acceptedPayments: ["stripe", "usdt", "eth"],
  };

  return (
    <div className="min-h-screen bg-[#030812] text-white">
      {showModal && (
        <InvestModal product={modalProduct} onClose={() => setShowModal(false)} />
      )}
      <div className="relative w-full h-52 overflow-hidden">
        <Image src={opp.banner} alt={opp.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030812] via-[#030812]/50 to-transparent" />
        <Link href="/dashboard/opportunities" className="absolute top-4 left-4 text-[12px] font-semibold text-white/70 hover:text-white z-10">Back</Link>
        <div className="absolute bottom-5 left-6 flex items-end gap-4 z-10">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 bg-[#030812] flex-shrink-0">
            <Image src={opp.logo} alt="" fill className="object-contain p-2" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#36E8CA]/20 text-[#36E8CA] uppercase tracking-wide">{opp.stage}</span>
              <span className={"text-[11px] font-semibold px-2 py-0.5 rounded " + statusCls[opp.status]}>{opp.statusLabel}</span>
            </div>
            <h1 className="text-[20px] font-bold text-white leading-tight">{opp.title}</h1>
            <p className="text-[12px] text-white/50 mt-0.5">{opp.sector}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-[16px] font-bold text-white mb-3">Overview</h2>
            <p className="text-[14px] text-[#9fb6d0] leading-relaxed">{opp.description}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-[16px] font-bold text-white mb-4">Key highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opp.highlights.map((h: string) => (
                <div key={h} className="flex items-start gap-2 text-[13px] text-[#9fb6d0]">
                  <span className="text-[#36E8CA] mt-0.5 flex-shrink-0">+</span>{h}
                </div>
              ))}
            </div>
          </div>
          {(opp as any).coInvestors && (opp as any).coInvestors.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-[16px] font-bold text-white mb-4">Co-investors</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {(opp as any).coInvestors.map((ci: string) => (
                  <span key={ci} className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-[#0D3880]/20 border border-[#0D3880]/40 text-[#60A5E0]">{ci}</span>
                ))}
              </div>
              <p className="text-[11px] text-[#9fb6d0]/60">{(opp as any).source}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {opp.tags.map((tag: string) => (
              <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-white/15 text-[#9fb6d0]">{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {opp.raised > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex justify-between text-[12px] text-[#9fb6d0] mb-2">
                <span>Fundraising progress</span><span>{pct.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/[0.08] rounded-full h-2 mb-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00A896] to-[#36E8CA]" style={{ width: pct + "%" }} />
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="font-mono font-bold text-white">{toM(opp.raised)} raised</span>
                <span className="text-[#9fb6d0]">{toM(opp.target)} target</span>
              </div>
            </div>
          )}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-3">
            {statsRows.map(row => (
              <div key={row.label} className="flex items-start justify-between text-[13px] gap-3">
                <span className="text-[#9fb6d0] flex-shrink-0">{row.label}</span>
                <span className="font-semibold text-white text-right">{row.value}</span>
              </div>
            ))}
          </div>

          {opp.status === "open" && (
            <div className="rounded-xl border border-[#36E8CA]/30 bg-[#081321] p-5">
              <h3 className="text-[15px] font-bold text-white mb-1">Invest Now</h3>
              <p className="text-[12px] text-[#9fb6d0] mb-4">Pay with credit card, USDT, ETH, or BNB. Accredited investors only.</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {(apiProduct?.acceptedPayments || ["stripe","usdt","eth"]).map(m => (
                  <span key={m} className="text-[11px] px-2 py-1 rounded border border-white/15 text-[#9fb6d0]">
                    {m === "stripe" ? "💳 Card" : m === "usdt" ? "🟢 USDT" : m === "eth" ? "⬡ ETH" : "🟡 BNB"}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 rounded-lg text-[14px] font-bold bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] hover:opacity-90 transition"
              >
                Invest in this opportunity
              </button>
              <p className="text-[11px] text-[#9fb6d0]/60 mt-3 text-center">Minimum: {modalProduct.minInvestment.toLocaleString()} USD</p>
            </div>
          )}
          {opp.status === "coming-soon" && (
            <div className="rounded-xl border border-[#D97706]/30 bg-[#D97706]/10 p-5 text-center">
              <h3 className="text-[14px] font-bold text-[#fbbf24] mb-2">Join the waitlist</h3>
              <p className="text-[12px] text-[#9fb6d0] mb-3">Secure priority access when this opportunity opens.</p>
              <button className="w-full py-2.5 rounded-lg text-[13px] font-bold border border-[#fbbf24]/40 text-[#fbbf24] hover:bg-[#fbbf24]/10 transition">Join waitlist</button>
            </div>
          )}
          {opp.status === "closed" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <h3 className="text-[14px] font-semibold text-white/50 mb-2">This round is closed</h3>
              <Link href="/dashboard/opportunities" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80">Browse open opportunities</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
              }
