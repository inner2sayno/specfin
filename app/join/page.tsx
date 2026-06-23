"use client";

import type { Metadata } from "next";
import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAppKit } from "@reown/appkit/react";

function JoinForm() {
  const searchParams = useSearchParams();
  const defaultMode = searchParams?.get("mode") === "signin" ? "signin" : "register";
  const [mode, setMode] = useState<"register" | "signin">(defaultMode);
  const [investorType, setInvestorType] = useState<string>("");
  const [email, setEmail] = useState("");
  const { open } = useAppKit();

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark navy brand */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#0D3880] flex-col justify-between px-12 py-16">
        <Link href="/">
          <Image src="/logo/logo-white.png" alt="Specfin Technologies" width={110} height={32} className="h-8 w-auto" />
        </Link>

        <div>
          <p className="text-[11px] font-bold text-[#36E8CA] tracking-[0.2em] uppercase mb-4">
            Institutional Access
          </p>
          <h1 className="text-[36px] lg:text-[44px] font-bold text-white leading-tight mb-5">
            Invest with institutional precision
          </h1>
          <p className="text-[16px] text-white/70 leading-relaxed mb-6">
            Hybrid hedge fund strategies and tokenized real-world assets — one platform, two pipelines.
            Cash or crypto welcome.
          </p>

          <div className="space-y-3">
            {[
              "Institutional-grade hedge fund strategies",
              "Tokenized real-world assets (Phase 2)",
              "On-chain transparency — every trade verifiable",
              "Smart contract vaults — audited and secure",
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-[#36E8CA] mt-0.5 flex-shrink-0">✓</span>
                <span className="text-[14px] text-white/70">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-white/30 mt-8">
            Accredited investors only. KYC verification required.
          </p>
        </div>

        <p className="text-[11px] text-white/20">© 2026 Specfin Technologies · Ark Global Co.</p>
      </div>

      {/* Right panel — white form */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Image src="/logo/logo-dark.png" alt="Specfin" width={100} height={28} className="h-7 w-auto"
                onError={e => { (e.target as HTMLImageElement).src = "/logo/logo-white.png"; }} />
            </Link>
          </div>

          {/* Mode toggle */}
          <div className="flex border border-[#E8EDF4] rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-md text-[14px] font-semibold transition ${mode === "register" ? "bg-[#0D3880] text-white" : "text-[#4A5568] hover:text-[#0D3880]"}`}
            >
              Create Account
            </button>
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 rounded-md text-[14px] font-semibold transition ${mode === "signin" ? "bg-[#0D3880] text-white" : "text-[#4A5568] hover:text-[#0D3880]"}`}
            >
              Sign In
            </button>
          </div>

          <h2 className="text-[22px] font-bold text-[#0B1628] mb-1">
            {mode === "register" ? "Create your investor account" : "Welcome back"}
          </h2>
          <p className="text-[14px] text-[#4A5568] mb-6">
            {mode === "register" ? "Join accredited investors on Specfin." : "Sign in to your Specfin account."}
          </p>

          {/* Investor type (register only) */}
          {mode === "register" && (
            <div className="mb-5">
              <label className="block text-[12px] font-semibold text-[#4A5568] uppercase tracking-wider mb-2">
                Investor type <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: "cash", label: "Cash (KRW/USD)", icon: "💵" },
                  { val: "crypto", label: "Crypto (USDT/USDC)", icon: "🔗" },
                  { val: "both", label: "Both", icon: "⚡" },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setInvestorType(opt.val)}
                    className={`p-3 rounded-lg border text-center transition ${investorType === opt.val ? "border-[#0D3880] bg-[#0D3880]/5" : "border-[#E8EDF4] hover:border-[#0D3880]/30"}`}
                  >
                    <div className="text-xl mb-1">{opt.icon}</div>
                    <div className="text-[11px] font-semibold text-[#0B1628] leading-tight">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[12px] font-semibold text-[#4A5568] uppercase tracking-wider mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-[#E8EDF4] rounded-lg px-4 py-3 text-[14px] text-[#0B1628] placeholder-[#9FB6D0] focus:outline-none focus:border-[#0D3880]/50 focus:ring-1 focus:ring-[#0D3880]/20"
            />
          </div>

          <button className="w-full py-3.5 rounded-lg text-[15px] font-bold bg-[#0D3880] text-white hover:bg-[#1a4fa0] transition mb-4">
            Continue with email →
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E8EDF4]" />
            <span className="text-[12px] text-[#9FB6D0]">or</span>
            <div className="flex-1 h-px bg-[#E8EDF4]" />
          </div>

          {/* Wallet connect */}
          <button
            onClick={() => open()}
            className="w-full py-3 rounded-lg border border-[#E8EDF4] text-[14px] font-semibold text-[#0B1628] hover:border-[#0D3880]/30 hover:bg-[#F7F9FC] transition flex items-center justify-center gap-3 mb-2"
          >
            <span>🦊</span> MetaMask
          </button>
          <button
            onClick={() => open()}
            className="w-full py-3 rounded-lg border border-[#E8EDF4] text-[14px] font-semibold text-[#0B1628] hover:border-[#0D3880]/30 hover:bg-[#F7F9FC] transition flex items-center justify-center gap-3 mb-2"
          >
            <span>👻</span> Phantom
          </button>
          <button
            onClick={() => open()}
            className="w-full py-3 rounded-lg border border-[#E8EDF4] text-[14px] font-semibold text-[#0B1628] hover:border-[#0D3880]/30 hover:bg-[#F7F9FC] transition flex items-center justify-center gap-3 mb-5"
          >
            <span>🔵</span> Coinbase Smart Wallet
          </button>

          <p className="text-center text-[11px] text-[#9FB6D0] mb-2">
            550+ wallets via WalletConnect
          </p>

          <p className="text-center text-[11px] text-[#9FB6D0]">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#0D3880] underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-[#0D3880] underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="text-[#4A5568]">Loading...</div></div>}>
      <JoinForm />
    </Suspense>
  );
}
