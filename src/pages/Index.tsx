
import { Suspense, lazy, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ParticleExplosion } from "../components/animations";
import { AnimatedHeroSection } from "../components/animations";
import HomeBenefitsSection from "../components/HomeBenefitsSection";
import DualPanelSection from "../components/DualPanelSection";
import AppFeaturesGrid from "../components/AppFeaturesGrid";
import FaqSection from "../components/FaqSection";
import DownloadSection from "../components/DownloadSection";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("../components/AboutSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));

const Index = () => {
  // Smooth scroll to section when clicking on anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const id = anchor.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-[#f3f1fe] to-[#e5deff] overflow-x-hidden">
      {/* Animated particles & Hero */}
      <ParticleExplosion>
        <Navbar />
        <main>
          <AnimatedHeroSection 
            title={<span><span className="font-headline text-6xl md:text-7xl text-purple-dark">SwiftRide</span>: Ride or Drive <span className="block text-4xl md:text-5xl text-gray-900 font-bold mt-2">Anytime, Anywhere</span></span>}
            subtitle="The travel app for everyone. Affordable, fast, and secure — whether you need a ride or want to drive. Experience ridesharing made simple."
            typingTexts={[
              "Book instantly, travel safely",
              "Drive and earn easily",
              "Seamless for riders & drivers",
              "Rated #1 for customer support"
            ]}
          />
        </main>
      </ParticleExplosion>

      <DualPanelSection />

      <AppFeaturesGrid />

      {/* New benefit section (for riders & drivers) */}
      <HomeBenefitsSection />

      <DownloadSection />

      <section className="relative z-10 pb-16 bg-transparent">
        <div id="about">
          <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
            <AboutSection />
          </Suspense>
        </div>
      </section>

      <FaqSection />

      <section className="relative z-10 pt-0 pb-12 bg-transparent" id="contact">
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <ContactSection />
        </Suspense>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
