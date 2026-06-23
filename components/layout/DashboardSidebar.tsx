"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCompass, FiHome, FiTrendingUp, FiStar, FiBookOpen, FiCalendar,
  FiPieChart, FiClock, FiBarChart2, FiBriefcase, FiFileText, FiRefreshCw,
  FiMenu, FiUser, FiSmartphone, FiUsers, FiMessageCircle, FiExternalLink, FiDollarSign,
} from "react-icons/fi";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}

const sections: Array<{ title: string; icon: React.ReactNode; items: NavItem[] }> = [
  {
    title: "Explore",
    icon: <FiCompass className="h-5 w-5 text-white" />,
    items: [
      { label: "Home", icon: <FiHome className="h-4 w-4" />, href: "/dashboard" },
      { label: "Opportunities", icon: <FiTrendingUp className="h-4 w-4" />, href: "/dashboard/opportunities" },
      { label: "News Feed", icon: <FiStar className="h-4 w-4" />, href: "/dashboard/news" },
      { label: "How to Invest", icon: <FiBookOpen className="h-4 w-4" />, href: "/how-to-invest" },
      { label: "Events & Webinars", icon: <FiCalendar className="h-4 w-4" />, href: "/dashboard/events" },
      { label: "Spectra Token", icon: <FiDollarSign className="h-4 w-4" />, href: "/dashboard/token" },
    ],
  },
  {
    title: "My Investments",
    icon: <FiPieChart className="h-5 w-5 text-white" />,
    items: [
      { label: "Pending", icon: <FiClock className="h-4 w-4" />, href: "/dashboard/pending" },
      { label: "Performance", icon: <FiBarChart2 className="h-4 w-4" />, href: "/dashboard/performance" },
      { label: "Holdings", icon: <FiBriefcase className="h-4 w-4" />, href: "/dashboard/holdings" },
      { label: "Reports & Tax Docs", icon: <FiFileText className="h-4 w-4" />, href: "/dashboard/reports" },
      { label: "Activities", icon: <FiRefreshCw className="h-4 w-4" />, href: "/dashboard/activities" },
    ],
  },
  {
    title: "General",
    icon: <FiMenu className="h-5 w-5 text-white" />,
    items: [
      { label: "My Profile", icon: <FiUser className="h-4 w-4" />, href: "/dashboard/profile" },
      { label: "Refer a Friend", icon: <FiUsers className="h-4 w-4" />, href: "/dashboard/refer" },
      { label: "Contact Us", icon: <FiMessageCircle className="h-4 w-4" />, href: "/contact-us" },
      { label: "Go to Specfin", icon: <FiExternalLink className="h-4 w-4" />, href: "/", external: true },
    ],
  },
];

function NavItemComponent({
  label, icon, href, active, external, onItemClick,
}: NavItem & { active: boolean; onItemClick?: () => void }) {
  const cls = `flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition ${
    active
      ? "bg-gradient-to-r from-[#00A896]/30 to-[#36E8CA]/20 text-[#36E8CA] font-semibold border border-[#36E8CA]/20"
      : "text-[#9fb6d0] hover:bg-white/[0.06] hover:text-white"
  }`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onItemClick}>
        {icon}<span className="flex-1">{label}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onItemClick}>
      {icon}<span className="flex-1">{label}</span>
    </Link>
  );
}

function NavSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-[11px] font-bold text-white/50 tracking-[0.12em] uppercase">{title}</h3>
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export default function DashboardSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && onClose) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = () => { if (onClose) onClose(); };

  const sidebarContent = (
    <aside className="fixed left-0 top-19 bottom-0 w-65 overflow-y-auto border-r border-white/5 bg-[#030812] lg:block dashboard-scroll">
      <div className="flex h-full flex-col gap-6 px-4 py-6">
        {sections.map((section) => (
          <NavSection key={section.title} icon={section.icon} title={section.title}>
            {section.items.map((item) => (
              <NavItemComponent
                key={item.label}
                {...item}
                active={pathname === item.href || (!!item.href && pathname?.startsWith(item.href + "/") && item.href !== "/dashboard")}
                onItemClick={handleClick}
              />
            ))}
          </NavSection>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{sidebarContent}</div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 top-19 bottom-0 w-65 overflow-y-auto border-r border-white/5 bg-[#030812] z-50 lg:hidden dashboard-scroll"
            >
              <div className="flex h-full flex-col gap-6 px-4 py-6">
                {sections.map((section) => (
                  <NavSection key={section.title} icon={section.icon} title={section.title}>
                    {section.items.map((item) => (
                      <NavItemComponent
                        key={item.label}
                        {...item}
                        active={pathname === item.href || (!!item.href && pathname?.startsWith(item.href + "/") && item.href !== "/dashboard")}
                        onItemClick={handleClick}
                      />
                    ))}
                  </NavSection>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
        }
