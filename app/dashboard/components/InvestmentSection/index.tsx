'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { OPPORTUNITIES } from '@/lib/specfinData';

const FILTERS = ['All', 'Growth Equity', 'Venture', 'Waitlist', 'Closed'];
const TYPE_MAP: Record<string, string> = {
  'Growth Equity': 'growth-equity',
  'Venture': 'venture',
  'Waitlist': 'coming-soon',
  'Closed': 'closed',
};

function toM(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  return (n / 1000).toFixed(0) + 'K';
}

function FundingBar({ raised, target }: { raised: number; target: number }) {
  const pct = Math.min((raised / target) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[11px] text-[#9fb6d0] mb-1">
        <span>Raised: {toM(raised)}</span>
        <span>Target: {toM(target)}</span>
      </div>
      <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#00A896] to-[#36E8CA]" style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles: Record<string, string> = {
    open: 'bg-[#059669]/15 text-[#34d399] border border-[#059669]/30',
    closed: 'bg-white/5 text-white/40 border border-white/10',
    'coming-soon': 'bg-[#D97706]/15 text-[#fbbf24] border border-[#D97706]/30',
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${styles[status] || ''}`}>
      {label}
    </span>
  );
}

function OpportunityCard({ opp }: { opp: typeof OPPORTUNITIES[0] }) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200">
      <div className="relative w-full h-36 overflow-hidden">
        <Image src={opp.banner} alt={opp.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030812]/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-[#030812]">
            <Image src={opp.logo} alt="" fill className="object-contain p-1" />
          </div>
          <StatusBadge status={opp.status} label={opp.statusLabel} />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <span className="text-[10px] font-bold text-[#36E8CA] uppercase tracking-wide">{opp.stage}</span>
          <h3 className="text-[14px] font-semibold text-white leading-snug mt-0.5">{opp.title}</h3>
          <p className="text-[11px] text-[#9fb6d0] mt-0.5">{opp.sector}</p>
        </div>
        <p className="text-[12px] text-[#9fb6d0] leading-relaxed line-clamp-2 flex-1">{opp.description}</p>
        {opp.raised > 0 && <FundingBar raised={opp.raised} target={opp.target} />}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-white/[0.04] rounded-lg p-2">
            <div className="text-[#9fb6d0] mb-0.5">Min. invest</div>
            <div className="font-semibold text-white">{opp.minInvestment}</div>
          </div>
          <div className="bg-white/[0.04] rounded-lg p-2">
            <div className="text-[#9fb6d0] mb-0.5">Fee structure</div>
            <div className="font-semibold text-[#36E8CA] text-[10px] leading-tight">{opp.fee}</div>
          </div>
        </div>
        {opp.investors > 0 && (
          <div className="flex items-center justify-between text-[11px] text-[#9fb6d0]">
            <span>{opp.investors} investors</span>
            {opp.daysLeft !== null && opp.daysLeft > 0 && (
              <span className="text-[#EFC878] font-semibold">{opp.daysLeft}d left</span>
            )}
          </div>
        )}
        {opp.coInvestors && opp.coInvestors.length > 0 && (
          <div className="text-[11px] text-[#9fb6d0]">
            <span className="text-white/40">Co-investors: </span>{opp.coInvestors.slice(0, 2).join(', ')}
          </div>
        )}
        <Link
          href={'/dashboard/opportunity/' + opp.slug}
          className={`mt-1 w-full py-2.5 rounded-lg text-[13px] font-bold text-center transition ${
            opp.status === 'open'
              ? 'bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] hover:opacity-90'
              : 'border border-white/15 text-white/60 hover:border-white/30'
          }`}
        >
          {opp.status === 'open' ? 'Invest now' : opp.status === 'coming-soon' ? 'Join waitlist' : 'View details'}
        </Link>
      </div>
    </div>
  );
}

export default function InvestmentSection({
  variant = 'dashboard',
}: {
  variant?: 'dashboard' | 'opportunities';
} = {}) {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? OPPORTUNITIES
      : active === 'Waitlist'
      ? OPPORTUNITIES.filter(o => o.status === 'coming-soon')
      : active === 'Closed'
      ? OPPORTUNITIES.filter(o => o.status === 'closed')
      : OPPORTUNITIES.filter(o => o.type === TYPE_MAP[active]);

  const featured = OPPORTUNITIES.filter(o => o.featured);
  const open = OPPORTUNITIES.filter(o => o.status === 'open' && !o.featured);
  const waitlist = OPPORTUNITIES.filter(o => o.status === 'coming-soon');
  const closed = OPPORTUNITIES.filter(o => o.status === 'closed');

  if (variant === 'opportunities') {
    return (
      <div className="flex w-full flex-col gap-10 py-6 px-4 lg:px-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition ${
                active === f
                  ? 'bg-[#36E8CA] text-[#030812] border-[#36E8CA]'
                  : 'border-white/15 text-[#9fb6d0] hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-white mb-5">
            {active === 'All' ? 'All opportunities' : active} ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(opp => <OpportunityCard key={opp.slug} opp={opp} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#030812] border-t border-white/5 py-10">
      <div className="mx-auto w-full flex flex-col gap-10 px-4 lg:px-6">
        {/* Featured / Open */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[22px] font-bold text-white">Open opportunities</h2>
              <p className="text-[13px] text-[#9fb6d0] mt-0.5">
                Pre-vetted deals co-invested alongside top-tier VCs
              </p>
            </div>
            <Link href="/dashboard/opportunities" className="text-[13px] font-semibold text-[#36E8CA] hover:opacity-80 transition">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featured.map(opp => <OpportunityCard key={opp.slug} opp={opp} />)}
          </div>
        </div>
        {/* More open */}
        {open.length > 0 && (
          <div>
            <h2 className="text-[18px] font-bold text-white mb-4">Also open</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {open.map(opp => <OpportunityCard key={opp.slug} opp={opp} />)}
            </div>
          </div>
        )}
        {/* Waitlist */}
        {waitlist.length > 0 && (
          <div>
            <h2 className="text-[18px] font-bold text-white mb-4">Coming soon — join waitlist</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {waitlist.map(opp => <OpportunityCard key={opp.slug} opp={opp} />)}
            </div>
          </div>
        )}
        {/* Closed */}
        {closed.length > 0 && (
          <div>
            <h2 className="text-[18px] font-bold text-white mb-4">Recent closes</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {closed.map(opp => <OpportunityCard key={opp.slug} opp={opp} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
