import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import SectionReveal from "@/components/SectionReveal";
import IntroOverlay from "@/components/IntroOverlay";

const Index = () => {
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntroActive(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen">
      <AmbientBackground />
      <AnimatePresence>{introActive && <IntroOverlay key="intro" />}</AnimatePresence>
      <div className="animate-intro-content-in">
        <Navbar />
        <main>
          <HeroSection showGraphic={!introActive} />
          <SectionReveal>
            <ProblemSection />
          </SectionReveal>
          <SectionReveal>
            <ServicesSection />
          </SectionReveal>
          <SectionReveal>
            <WhyUsSection />
          </SectionReveal>
          <SectionReveal>
            <ProcessSection />
          </SectionReveal>
          <SectionReveal>
            <FAQSection />
          </SectionReveal>
          <SectionReveal>
            <ContactSection />
          </SectionReveal>
        </main>
        <SectionReveal>
          <FooterSection />
        </SectionReveal>
      </div>
    </div>
  );
};

export default Index;
