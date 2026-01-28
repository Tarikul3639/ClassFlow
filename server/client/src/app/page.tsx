"use client";
import { Navbar } from "@/app/_component/Navbar";
import { UIMockup } from "@/app/_component/UIMockup";
import { HeroSection } from "@/app/_component/HeroSection";
import { BackgroundEffects } from "@/app/_component/BackgroundEffects";
import { FeaturesSection } from "@/app/_component/FeaturesSection";
import { CTASection } from "@/app/_component/CTASection";
import { Footer } from "@/app/_component/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden font-display">
      <Navbar />

      <main className="relative max-w-7xl mx-auto pt-2 grow">
        <HeroSection />
        <BackgroundEffects />
        <UIMockup />

        <FeaturesSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
