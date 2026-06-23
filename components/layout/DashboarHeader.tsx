'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function DashboardHeader({ onMenuToggle, isSidebarOpen = false }: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#1a2a3a] bg-[#030812]">
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 sm:px-8 py-4">
        <div className="flex flex-1 items-center gap-4 sm:gap-6">
          {/* Mobile burger */}
          <button
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 lg:hidden"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-4 sm:gap-7">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo-white.png"
                alt="Specfin Technologies"
                width={110}
                height={32}
                priority
                className="h-6 w-auto sm:h-8"
              />
            </Link>

            <nav className="hidden sm:block text-sm font-medium">
              <Link
                href="/dashboard"
                style={{
                  background: 'linear-gradient(90deg, #60A5E0 0%, #36E8CA 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                My Portfolio
              </Link>
            </nav>
          </div>

          <div className="hidden lg:flex w-[360px] max-w-[420px] items-center rounded-lg bg-white/[0.05] border border-white/10 px-5 py-2 text-sm text-white/70">
            <input
              type="text"
              placeholder="Search investments, strategies..."
              className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-[13px]"
              aria-label="Search"
            />
            <button type="button" className="text-white/50 hover:text-white">
              <FiSearch className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-white/30 transition"
            aria-label="Search"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-white/30 transition relative"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#36E8CA] rounded-full" />
          </button>

          <Link
            href="/dashboard/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-white/30 transition"
            aria-label="Profile"
          >
            <FiUser className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
