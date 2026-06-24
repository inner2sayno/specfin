"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "ko";

const T = {
  en: {
    // Header / Nav (public)
    nav_invest: "Invest",
    nav_rwa: "RWA Assets",
    nav_spectra: "Spectra Token",
    nav_about: "About",
    nav_signin: "Sign in",
    nav_join: "Join now",
    nav_dashboard: "Dashboard",
    subnav_hedge: "Hedge Fund Strategies",
    subnav_token: "Token Sales",
    subnav_rwa: "Real World Assets",
    subnav_spectra: "Spectra Token",
    // Hero
    hero_badge: "Institutional Hybrid Investment Platform",
    hero_h1a: "The bridge between",
    hero_h1b: "institutional capital",
    hero_h1c: "and digital assets",
    hero_p: "Cash investors and crypto holders. One unified platform. Institutional-grade hedge fund strategies, verified on-chain trader performance, and tokenized real-world assets — accessible to any accredited investor.",
    hero_cta1: "Join as Investor",
    hero_cta2: "Connect Wallet",
    hero_trust1: "Smart contract vaults",
    hero_trust2: "On-chain transparency",
    hero_trust3: "Independent audits",
    hero_aum: "Total AUM under management",
    hero_ytd: "YTD Return",
    hero_investors: "Investors",
    hero_tier: "Your tier",
    hero_phase: "Phase 1 · Accepting accredited investors",
    // Achievement
    achieve_badge: "Now accepting applications",
    achieve_h2: "Accepting investor applications for Phase 1",
    achieve_p: "Specfin Technologies is currently onboarding accredited investors for our Hybrid Hedge Fund Platform. Join the waitlist to secure early access and reduced performance fees as a founding investor.",
    achieve_stat1: "Now accepting",
    achieve_stat2: "Deposit methods",
    achieve_stat3: "Transparency",
    achieve_cta: "Apply for early access",
    achieve_note: "Accredited investors only",
    // Footer
    footer_tagline: "Institutional hybrid investment platform. Traditional Finance meets Decentralized Finance.",
    footer_copy: "© 2026 Specfin Technologies · Ark Global Co. · All rights reserved.",
    footer_legal: "Accredited investors only · Not financial advice · Past performance is not indicative of future results",
    footer_col_platform: "Platform",
    footer_col_company: "Company",
    footer_col_support: "Support",
    footer_col_legal: "Legal",
    footer_link_howtoinvest: "How to Invest",
    footer_link_invest: "Investment Opportunities",
    footer_link_rwa: "RWA Assets",
    footer_link_spectra: "Spectra Token",
    footer_link_leaderboard: "Trader Leaderboard",
    footer_link_about: "About Us",
    footer_link_team: "Our Team",
    footer_link_careers: "Careers",
    footer_link_press: "Press & Media",
    footer_link_contact: "Contact Us",
    footer_link_faq: "FAQ",
    footer_link_risk: "Risk Disclosure",
    footer_link_security: "Security",
    footer_link_cookies: "Cookie Settings",
    footer_link_privacy: "Privacy Policy",
    footer_link_terms: "Terms of Service",
    footer_link_disclaimer: "General Disclaimer",
    footer_link_accredited: "Accredited Investor Notice",
    // Dashboard header
    db_search_placeholder: "Search investments, strategies...",
    db_my_portfolio: "My Portfolio",
    // Dashboard sidebar sections
    db_sec_explore: "Explore",
    db_sec_investments: "My Investments",
    db_sec_general: "General",
    // Dashboard sidebar items
    db_home: "Home",
    db_opportunities: "Opportunities",
    db_news: "News Feed",
    db_howtoinvest: "How to Invest",
    db_events: "Events & Webinars",
    db_spectra: "Spectra Token",
    db_pending: "Pending",
    db_performance: "Performance",
    db_holdings: "Holdings",
    db_reports: "Reports & Tax Docs",
    db_activities: "Activities",
    db_profile: "My Profile",
    db_refer: "Refer a Friend",
    db_contact: "Contact Us",
    db_go_site: "Go to Specfin",
  },
  ko: {
    // Header / Nav (public)
    nav_invest: "투자하기",
    nav_rwa: "실물자산(RWA)",
    nav_spectra: "스펙트라 토큰",
    nav_about: "소개",
    nav_signin: "로그인",
    nav_join: "가입하기",
    nav_dashboard: "대시보드",
    subnav_hedge: "헤지펀드 전략",
    subnav_token: "토큰 세일",
    subnav_rwa: "실물자산",
    subnav_spectra: "스펙트라 토큰",
    // Hero
    hero_badge: "기관급 하이브리드 투자 플랫폼",
    hero_h1a: "기관 자본과",
    hero_h1b: "디지털 자산을",
    hero_h1c: "잇는 다리",
    hero_p: "현금 투자자와 암호화폐 보유자를 위한 하나의 통합 플랫폼. 기관급 헤지펀드 전략, 온체인으로 검증된 트레이더 성과, 토큰화된 실물자산 — 모든 적격 투자자에게 개방합니다.",
    hero_cta1: "투자자로 가입하기",
    hero_cta2: "지갑 연결",
    hero_trust1: "스마트컨트랙트 금고",
    hero_trust2: "온체인 투명성",
    hero_trust3: "독립 감사",
    hero_aum: "총 운용자산(AUM)",
    hero_ytd: "연간 수익률",
    hero_investors: "투자자 수",
    hero_tier: "내 등급",
    hero_phase: "Phase 1 · 적격 투자자 모집 중",
    // Achievement
    achieve_badge: "지금 신청 받는 중",
    achieve_h2: "Phase 1 투자자 신청 접수 중",
    achieve_p: "Specfin Technologies는 현재 하이브리드 헤지펀드 플랫폼 Phase 1 적격 투자자를 모집하고 있습니다. 초기 투자자로 대기자 명단에 등록하시면 우선 접근권과 성과 보수 할인 혜택을 받으실 수 있습니다.",
    achieve_stat1: "현재 모집 중",
    achieve_stat2: "입금 수단",
    achieve_stat3: "투명성",
    achieve_cta: "조기 접근 신청하기",
    achieve_note: "적격 투자자 전용",
    // Footer
    footer_tagline: "기관급 하이브리드 투자 플랫폼. 전통 금융과 탈중앙화 금융의 만남.",
    footer_copy: "© 2026 Specfin Technologies · Ark Global Co. · 모든 권리 보유.",
    footer_legal: "적격 투자자 전용 · 투자 조언이 아닙니다 · 과거 성과는 미래 결과를 보장하지 않습니다",
    footer_col_platform: "플랫폼",
    footer_col_company: "회사",
    footer_col_support: "고객지원",
    footer_col_legal: "법적고지",
    footer_link_howtoinvest: "투자 방법",
    footer_link_invest: "투자 기회",
    footer_link_rwa: "실물자산",
    footer_link_spectra: "스펙트라 토큰",
    footer_link_leaderboard: "트레이더 리더보드",
    footer_link_about: "회사 소개",
    footer_link_team: "팀 소개",
    footer_link_careers: "채용",
    footer_link_press: "보도자료",
    footer_link_contact: "문의하기",
    footer_link_faq: "자주 묻는 질문",
    footer_link_risk: "위험 고지",
    footer_link_security: "보안",
    footer_link_cookies: "쿠키 설정",
    footer_link_privacy: "개인정보 처리방침",
    footer_link_terms: "이용약관",
    footer_link_disclaimer: "일반 면책 조항",
    footer_link_accredited: "적격 투자자 공지",
    // Dashboard header
    db_search_placeholder: "투자 상품, 전략 검색...",
    db_my_portfolio: "내 포트폴리오",
    // Dashboard sidebar sections
    db_sec_explore: "탐색",
    db_sec_investments: "내 투자",
    db_sec_general: "일반",
    // Dashboard sidebar items
    db_home: "홈",
    db_opportunities: "투자 기회",
    db_news: "뉴스 피드",
    db_howtoinvest: "투자 방법",
    db_events: "이벤트 & 웨비나",
    db_spectra: "스펙트라 토큰",
    db_pending: "대기 중",
    db_performance: "수익률",
    db_holdings: "보유 자산",
    db_reports: "리포트 & 세금 서류",
    db_activities: "활동 내역",
    db_profile: "내 프로필",
    db_refer: "친구 초대",
    db_contact: "문의하기",
    db_go_site: "Specfin 사이트로",
  },
} as const;

export type TKey = keyof typeof T.en;

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => T.en[k],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("specfin_lang") as Lang | null;
      if (saved === "ko" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("specfin_lang", l); } catch {}
  };

  const t = (key: TKey): string =>
    (T[lang] as Record<string, string>)[key] ??
    (T.en as Record<string, string>)[key] ??
    key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
