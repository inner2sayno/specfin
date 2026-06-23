"use client";
import Link from "next/link";
import { NEWS_ARTICLES } from "@/lib/specfinData";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function NewsCard({ article }: { article: typeof NEWS_ARTICLES[0] }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer">
      <div className="w-full sm:w-28 flex-shrink-0 h-16 rounded-lg overflow-hidden bg-white/[0.06] flex items-center justify-center">
        <span style={{ color: article.categoryColor }} className="text-2xl font-bold opacity-40">S</span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ color: article.categoryColor, backgroundColor: article.categoryColor + '20' }}>
            {article.category}
          </span>
          <span className="text-[11px] text-[#9fb6d0]">{article.readTime} · {formatDate(article.date)}</span>
        </div>
        <h3 className="text-[14px] font-semibold text-white leading-snug">{article.title}</h3>
        <p className="text-[12px] text-[#9fb6d0] leading-relaxed line-clamp-2">{article.excerpt}</p>
        <p className="text-[11px] text-[#9fb6d0]/60">By {article.author}</p>
      </div>
    </div>
  );
}

export default function PortfolioNewsSection() {
  const latest = NEWS_ARTICLES.slice(0, 4);
  return (
    <section className="w-full bg-[#030812] border-t border-white/5 py-10">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-white">Portfolio news & insights</h2>
            <p className="text-[13px] text-[#9fb6d0] mt-0.5">Latest updates from Specfin, fund managers, and the market</p>
          </div>
          <Link href="/dashboard/news" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80 transition whitespace-nowrap">
            See all →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {latest.map(article => <NewsCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  );
}
