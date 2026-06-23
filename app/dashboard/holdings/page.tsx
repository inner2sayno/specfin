import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Holdings" };
export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#030812] flex flex-col items-center justify-center px-6 py-20">
      <div className="text-5xl mb-6">💼</div>
      <h1 className="text-[24px] font-bold text-white mb-3 text-center">Holdings</h1>
      <p className="text-[14px] text-[#9fb6d0] text-center max-w-md mb-8 leading-relaxed">No holdings yet. Your confirmed investment positions will appear here with real-time NAV and on-chain verification links.</p>
      <Link href="/invest" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] text-[14px] font-bold hover:opacity-90 transition">
        Browse opportunities →
      </Link>
    </div>
  );
}
