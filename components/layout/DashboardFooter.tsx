'use client';

import Link from 'next/link';

const footerLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'General Disclaimer', href: '/disclaimer' },
  { label: 'Risk Disclosure', href: '/risk' },
  { label: 'Security', href: '/security' },
  { label: 'Cookie Settings', href: '/cookies' },
];

export default function DashboardFooter() {
  return (
    <footer className="fixed bottom-0 left-[260px] right-0 h-[46px] flex items-center justify-center gap-4 px-6 bg-[#020712] border-t border-white/5">
      <p className="text-[#4A5568] text-xs">
        © 2026 Specfin Technologies · Ark Global Co. · All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        {footerLinks.map((link, index) => (
          <div key={link.href} className="flex items-center gap-3">
            {index > 0 && <span className="text-[#4A5568] text-sm">|</span>}
            <Link
              href={link.href}
              className="text-[#4A5568] text-xs hover:text-[#36E8CA] transition-colors"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </footer>
  );
}
