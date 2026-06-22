import HeroSection from "./components/HeroSection";
import PartnerSection from "./components/PartnerSection";
import AchievementSection from "./components/AchievementSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import InvestSection from "./components/InvestSection";
import HowToStartInvestSection from "./components/HowToStartInvestSection";
import QuestionSection from "./components/QuestionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnerSection />
      <AchievementSection />
      <WhyChooseUsSection />
      <InvestSection />
      <HowToStartInvestSection />
      <QuestionSection />
    </>
  );
}
