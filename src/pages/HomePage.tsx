import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingHero } from '@/components/landing/LandingHero';
import { InvestSection } from '@/components/landing/InvestSection';
import { NextLevelTradingSection } from '@/components/landing/NextLevelTradingSection';
import { ProScannerSection } from '@/components/landing/ProScannerSection';
import { BuildExperienceSection } from '@/components/landing/BuildExperienceSection';
import { TZ1Section } from '@/components/landing/TZ1Section';
import { StepsSection } from '@/components/landing/StepsSection';
import { MobileSection } from '@/components/landing/MobileSection';
import { CTABanner } from '@/components/landing/CTABanner';
import { LandingFooter } from '@/components/landing/LandingFooter';

const HomePage = () => {
  return (
    <div className="dark bg-background-dark text-slate-100">
      <LandingHeader />
      <LandingHero />
      <InvestSection />
      <NextLevelTradingSection />
      <ProScannerSection />
      <BuildExperienceSection />
      <TZ1Section />
      <StepsSection />
      <MobileSection />
      <CTABanner />
      <LandingFooter />
    </div>
  );
};

export default HomePage;
