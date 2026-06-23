import type { Metadata } from "next";
import { NEWS_ARTICLES } from "@/lib/specfinData";
import Link from "next/link";

export const metadata: Metadata = { title: "News & Insights" };

const CAT_COLORS: Record<string, string> = {
  "Platform Update":"#36E8CA","Market Insight":"#9FB6D0","Blockchain":"#7C3AED",
  "Education":"#EFC878","RWA":"#00A896","Investor Guide":"#60A5E0",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
}

export default function NewsPage() {
  const [first, ...rest] = NEWS_ARTICLES;
  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">Specfin Intelligence</p>
        <h1 className="text-[28px] font-bold text-white mb-2">News & Insights</h1>
        <p className="text-[14px] text-[#9fb6d0]">Platform updates, market intelligence, and investor education from the Specfin team.</p>
      </div>
      <div className="px-4 lg:px-6 py-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All",...Object.keys(CAT_COLORS)].map(cat => {
            const c = cat==="All"?"#36E8CA":(CAT_COLORS[cat]||"#36E8CA");
            return (
              <span key={cat} className="text-[12px] font-semibold px-3 py-1.5 rounded-full border cursor-pointer"
                style={{color:c,borderColor:c+"40",backgroundColor:c+"15"}}>{cat}</span>
            );
          })}
        </div>
        {/* Featured */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{color:CAT_COLORS[first.category],backgroundColor:CAT_COLORS[first.category]+"20"}}>
              {first.category}
            </span>
            <span className="text-[11px] text-[#9fb6d0]">Featured · {first.readTime}</span>
          </div>
          <h2 className="text-[20px] font-bold text-white mb-2 leading-snug">{first.title}</h2>
          <p className="text-[14px] text-[#9fb6d0] leading-relaxed mb-4">{first.excerpt}</p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[12px] text-[#9fb6d0]">By {first.author} · {fmtDate(first.date)}</span>
            <Link href="#" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80">Read full article →</Link>
          </div>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map(a => {
            const c = CAT_COLORS[a.category]||"#36E8CA";
            return (
              <div key={a.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{color:c,backgroundColor:c+"20"}}>{a.category}</span>
                  <span className="text-[11px] text-[#9fb6d0]">{a.readTime}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">{a.title}</h3>
                <p className="text-[13px] text-[#9fb6d0] leading-relaxed mb-3 line-clamp-2">{a.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-[11px] text-[#9fb6d0]/60">By {a.author} · {fmtDate(a.date)}</span>
                  <Link href="#" className="text-[12px] font-semibold hover:opacity-80" style={{color:c}}>Read →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
            }
