"use client";
import { useState } from "react";
import { EVENTS } from "@/lib/specfinData";

export default function EventsPage() {
  const [registered, setRegistered] = useState<number[]>([]);
  const toggle = (id: number) => setRegistered(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const fmtDate = (s: string) => new Date(s).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#030812] text-white">
      <div className="px-4 lg:px-6 py-8 border-b border-white/5">
        <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.18em] uppercase mb-2">Live & Virtual</p>
        <h1 className="text-[28px] font-bold text-white mb-2">Events & Webinars</h1>
        <p className="text-[14px] text-[#9fb6d0]">Join the Specfin team and expert guests for deep dives, Q&As, and the annual Seoul Investor Summit.</p>
      </div>
      <div className="px-4 lg:px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[13px] font-semibold text-white">{EVENTS.length} upcoming events</span>
          <span className="text-[#9fb6d0]">·</span>
          <span className="text-[13px] text-[#9fb6d0]">{registered.length} registered</span>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {EVENTS.map(ev => {
            const isReg = registered.includes(ev.id);
            return (
              <div key={ev.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4 hover:border-white/20 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ color: ev.typeColor, backgroundColor: ev.typeColor + "20" }}>{ev.type}</span>
                    {ev.virtual
                      ? <span className="text-[11px] text-[#9fb6d0] border border-white/10 px-2 py-0.5 rounded">Virtual</span>
                      : <span className="text-[11px] text-[#EFC878] border border-[#EFC878]/30 px-2 py-0.5 rounded">In-person · {(ev as any).location}</span>
                    }
                  </div>
                  <span className="text-[11px] text-[#9fb6d0] flex-shrink-0">{ev.attendees} registered</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-white mb-2 leading-snug">{ev.title}</h3>
                  <p className="text-[13px] text-[#9fb6d0] leading-relaxed">{ev.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[12px]">
                  <div className="bg-white/[0.04] rounded-lg p-3">
                    <div className="text-[#9fb6d0] mb-1">Date</div>
                    <div className="font-semibold text-white text-[11px]">{fmtDate(ev.date)}</div>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg p-3">
                    <div className="text-[#9fb6d0] mb-1">Time</div>
                    <div className="font-semibold text-white text-[11px]">{ev.time} · {ev.duration}</div>
                  </div>
                </div>
                <div className="text-[12px] text-[#9fb6d0]">
                  <span className="font-semibold text-white">Speakers: </span>{ev.speakers.join(", ")}
                </div>
                <button
                  onClick={() => toggle(ev.id)}
                  className={"w-full py-3 rounded-lg text-[13px] font-bold transition " + (isReg
                    ? "border border-[#36E8CA]/40 text-[#36E8CA] bg-[#36E8CA]/10"
                    : "bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] hover:opacity-90")}
                >
                  {isReg ? "✓ Registered — click to cancel" : "Register for free"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
