'use client';
import Link from 'next/link';
import { LEARN_ARTICLES } from '@/lib/specfinData';

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': '#36E8CA',
  'Hedge Funds': '#0D3880',
  'RWA': '#00A896',
  'Blockchain': '#7C3AED',
  'Tax & Legal': '#EFC878',
};

export default function GettingStartedSection() {
  return (
    <section className="w-full bg-[#030812] border-t border-white/5 py-10">
      <div className="mx-auto w-full flex flex-col gap-6 px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-white">Learn how to get started</h2>
            <p className="text-[13px] text-[#9fb6d0] mt-0.5">Guides and explainers for every stage of your investment journey</p>
          </div>
          <Link href="/dashboard/learn" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80 transition whitespace-nowrap">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LEARN_ARTICLES.map((article) => {
            const color = CATEGORY_COLORS[article.category] || '#36E8CA';
            return (
              <div key={article.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ color, backgroundColor: color + '20' }}>
                    {article.category}
                  </span>
                  <span className="text-[11px] text-[#9fb6d0]">{article.readTime}</span>
                </div>
                <h3 className="text-[13px] font-semibold text-white leading-snug">{article.title}</h3>
                <p className="text-[12px] text-[#9fb6d0] leading-relaxed flex-1 line-clamp-3">{article.description}</p>
                <span className="text-[12px] font-semibold flex items-center gap-1" style={{ color }}>
                  Read guide
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
