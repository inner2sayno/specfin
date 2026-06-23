import AssetClassesSection from "./components/AssetClassesSection";
import GettingStartedSection from "./components/GettingStartedSection";
import HeroSection from "./components/HeroSection";
import InvestmentIntroSection from "./components/InvestmentIntroSection";
import InvestmentSection from "./components/InvestmentSection";
import NextStepSection from "./components/NextStepSection";
import PortfolioNewsSection from "./components/PortfolioNewsSection";
import WelcomeUserSection from "./components/WelcomeUser";

export default function DashboardPage() {
  return (
    <div className="bg-[#030812] text-white">
      <WelcomeUserSection />
      <HeroSection />
      <InvestmentIntroSection />
      <NextStepSection />
      <InvestmentSection />
      <AssetClassesSection />
      <PortfolioNewsSection />
      <GettingStartedSection />
    </div>
  );
}
