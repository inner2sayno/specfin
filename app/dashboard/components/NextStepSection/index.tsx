'use client';
import Link from 'next/link';

const STEPS = [
  { icon: "📊", title: "Browse strategies", desc: "5 min", href: "/dashboard/opportunities", color: "#36E8CA" },
  { icon: "📰", title: "Read the news", desc: "3 min", href: "/dashboard/news", color: "#60A5E0" },
  { icon: "🎟️", title: "Register for webinar", desc: "2 min", href: "/dashboard/events", color: "#EFC878" },
  { icon: "🪙", title: "Check Spectra tiers", desc: "2 min", href: "/dashboard/token", color: "#9F84FF" },
  { icon: "👤", title: "Complete your profile", desc: "5 min", href: "/dashboard/profile", color: "#00A896" },
];

export default function NextStepSection() {
  return (
    <section className="w-full bg-[#030812] border-t border-white/5 py-8">
      <div className="mx-auto w-full flex flex-col gap-5 px-4 lg:px-6">
        <h2 className="text-[18px] font-bold text-white">Your next steps</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <Link key={i} href={step.href}
              className="group relative flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.06] text-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1"
                style={{ backgroundColor: step.color + "20", border: "1px solid " + step.color + "40" }}>
                {step.icon}
              </div>
              <h3 className="text-[13px] font-semibold text-white leading-snug">{step.title}</h3>
              <p className="text-[11px]" style={{ color: step.color }}>{step.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
