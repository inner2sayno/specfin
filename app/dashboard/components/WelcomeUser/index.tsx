"use client";

import { useAppKit } from "@reown/appkit/react";
import Link from "next/link";
import { useAppSelector } from "@/store/store";

export default function WelcomeUserSection() {
  const user = useAppSelector((state) => state.auth.user);
  const isConnected = useAppSelector((state) => state.auth.isConnected);
  const { open } = useAppKit();

  // Get greeting based on time
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <section className="w-full bg-[#030812] pt-8 pb-2">
      <div className="mx-auto w-full px-6">
        {isConnected && user ? (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-white text-[24px] font-bold">
                {greeting}, {user.username || "Investor"} 👋
              </h1>
              <p className="text-[#9fb6d0] text-[14px] mt-1">
                Your portfolio is ready. Browse opportunities to grow your investment.
              </p>
            </div>
            <button
              onClick={() => open()}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] text-[14px] font-bold hover:opacity-90 transition"
            >
              Open Wallet
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-white text-[24px] font-bold">
                {greeting}. Welcome to Specfin.
              </h1>
              <p className="text-[#9fb6d0] text-[14px] mt-1">
                Your portfolio is ready. Browse opportunities to make your first investment.
              </p>
            </div>
            <Link
              href="/join"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00A896] to-[#36E8CA] text-[#030812] text-[14px] font-bold hover:opacity-90 transition"
            >
              Connect wallet
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
