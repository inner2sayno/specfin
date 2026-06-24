"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCompass, FiHome, FiTrendingUp, FiStar, FiBookOpen, FiCalendar,
  FiPieChart, FiClock, FiBarChart2, FiBriefcase, FiFileText, FiRefreshCw,
  FiMenu, FiUser, FiUsers, FiMessageCircle, FiExternalLink, FiDollarSign,
} from "react-icons/fi";
import { useLanguage, TKey } from "@/lib/i18n";

interface NavItem {
  labelKey: TKey;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}
interface SectionDef {
  titleKey: TKey;
  icon: React.ReactNode;
  items: NavItem[];
}

const SECTION_DEFS: SectionDef[] = [
  {
    titleKey: "db_sec_explore",
    icon: <FiCompass className="h-3.5 w-3.5 text-white/40" />,
    items: [
      { labelKey: "db_home", icon: <FiHome className="h-3.5 w-3.5" />, href: "/dashboard" },
      { labelKey: "db_opportunities", icon: <FiTrendingUp className="h-3.5 w-3.5" />, href: "/dashboard/opportunities" },
      { labelKey: "db_news", icon: <FiStar className="h-3.5 w-3.5" />, href: "/dashboard/news" },
      { labelKey: "db_howtoinvest", icon: <FiBookOpen className="h-3.5 w-3.5" />, href: "/how-to-invest" },
      { labelKey: "db_events", icon: <FiCalendar className="h-3.5 w-3.5" />, href: "/dashboard/events" },
      { labelKey: "db_spectra", icon: <FiDollarSign className="h-3.5 w-3.5" />, href: "/dashboard/token" },
    ],
  },
  {
    titleKey: "db_sec_investments",
    icon: <FiPieChart className="h-3.5 w-3.5 text-white/40" />,
    items: [
      { labelKey: "db_pending", icon: <FiClock className="h-3.5 w-3.5" />, href: "/dashboard/pending" },
      { labelKey: "db_performance", icon: <FiBarChart2 className="h-3.5 w-3.5" />, href: "/dashboard/performance" },
      { labelKey: "db_holdings", icon: <FiBriefcase className="h-3.5 w-3.5" />, href: "/dashboard/holdings" },
      { labelKey: "db_reports", icon: <FiFileText className="h-3.5 w-3.5" />, href: "/dashboard/reports" },
      { labelKey: "db_activities", icon: <FiRefreshCw className="h-3.5 w-3.5" />, href: "/dashboard/activities" },
    ],
  },
  {
    titleKey: "db_sec_general",
    icon: <FiMenu className="h-3.5 w-3.5 text-white/40" />,
    items: [
      { labelKey: "db_profile", icon: <FiUser className="h-3.5 w-3.5" />, href: "/dashboard/profile" },
      { labelKey: "db_refer", icon: <FiUsers className="h-3.5 w-3.5" />, href: "/dashboard/refer" },
      { labelKey: "db_contact", icon: <FiMessageCircle className="h-3.5 w-3.5" />, href: "/contact-us" },
      { labelKey: "db_go_site", icon: <FiExternalLink className="h-3.5 w-3.5" />, href: "/", external: true },
    ],
  },
];

function NavItemComponent({
  label, icon, href, active, external, onItemClick,
}: { label: string; icon: React.ReactNode; href: string; active: boolean; external?: boolean; onItemClick?: () => void }) {
  const cls = `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] transition ${
    active
      ? "bg-gradient-to-r from-[#00A896]/30 to-[#36E8CA]/20 text-[#36E8CA] font-semibold border border-[#36E8CA]/20"
      : "text-[#9fb6d0] hover:bg-white/[0.06] hover:text-white"
  }`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onItemClick}>
        {icon}<span>{label}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onItemClick}>
      {icon}<span>{label}</span>
    </Link>
  );
}

function NavSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 px-2 mb-1">
        {icon}
        <span className="text-[10px] font-bold text-white/30 tracking-[0.12em] uppercase">{title}</span>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ overflow: "hidden" }}>
      {/* Nav: no scrollbar, tight vertical rhythm */}
      <nav className="flex-1 py-4 px-2.5 flex flex-col gap-3" style={{ overflow: "hidden" }}>
        {SECTION_DEFS.map((section) => (
          <NavSection key={section.titleKey} icon={section.icon} title={t(section.titleKey)}>
            {section.items.map((item) => (
              <NavItemComponent
                key={item.href}
                label={t(item.labelKey)}
                icon={item.icon}
                href={item.href}
                active={pathname === item.href}
                external={item.external}
                onItemClick={onClose}
              />
            ))}
          </NavSection>
        ))}
      </nav>

      {/* User badge */}
      <div className="px-3 py-3 border-t border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0D3880] to-[#00A896] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
            J
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate">Investor</p>
            <p className="text-[10px] text-[#9fb6d0] truncate">Accredited</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop — scrollbar hidden via CSS */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-[72px] bottom-0 w-65 bg-[#030812] border-r border-white/[0.06] z-30"
        style={{ overflow: "hidden" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#030812] border-r border-white/[0.06] z-50 lg:hidden"
              style={{ overflow: "hidden" }}
            >
              <div className="h-[72px] border-b border-white/[0.06]" />
              <div style={{ height: "calc(100% - 72px)", overflow: "hidden" }}>
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
                          }
