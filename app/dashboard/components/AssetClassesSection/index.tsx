'use client';
import Link from 'next/link';
import { ASSET_CLASSES } from '@/lib/specfinData';

export default function AssetClassesSection() {
  return (
    <section className="w-full bg-[#030812] border-t border-white/5 py-10">
      <div className="mx-auto w-full flex flex-col gap-7 px-4 lg:px-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-bold text-white">Investment types</h2>
          <p className="text-[13px] text-[#9fb6d0]">Diversified access to institutional-grade private market opportunities</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ASSET_CLASSES.map((cls) => (
            <div key={cls.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4 hover:border-white/20 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: cls.color + '20', border: '1px solid ' + cls.color + '40' }}>
                  {cls.icon}
                </div>
                <h3 className="text-[16px] font-semibold text-white">{cls.title}</h3>
              </div>
              <p className="text-[13px] text-[#9fb6d0] leading-relaxed flex-1">{cls.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-1 rounded" style={{ color: cls.color, backgroundColor: cls.color + '15' }}>{cls.stats}</span>
                <Link href={cls.href} className="text-[13px] font-semibold flex items-center gap-1 hover:opacity-80 transition" style={{ color: cls.color }}>
                  Explore <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
