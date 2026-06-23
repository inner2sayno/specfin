import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Reports & Tax Documents" };
export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#030812] flex flex-col items-center justify-center px-6 py-20">
      <div className="text-5xl mb-6">📄</div>
      <h1 className="text-[24px] font-bold text-white mb-3 text-center">Reports & Tax Documents</h1>
      <p className="text-[14px] text-[#9fb6d0] text-center max-w-md mb-8 leading-relaxed">No reports available yet. Annual tax summaries, transaction histories, and gain/loss reports (Korean 가상자산 과세 format) will generate automatically once you have investment activity.</p>
      <Link href="/dashboard" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] text-[14px] font-bold hover:opacity-90 transition">
        Go to dashboard →
      </Link>
    </div>
  );
}
