import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EngineeringEngine } from './components/EngineeringEngine';
import { EcosystemShowcase } from './components/EcosystemShowcase';
import { DeveloperMatrix } from './components/DeveloperMatrix';
import { CallToActionFooter } from './components/CallToActionFooter';
import { AntigravityDiary } from './components/AntigravityDiary';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'SHOWCASE' | 'DIARY'>('SHOWCASE');

  const handleOpenDiary = () => {
    setCurrentView('DIARY');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShowcase = () => {
    setCurrentView('SHOWCASE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (href: string) => {
    if (currentView === 'DIARY') {
      setCurrentView('SHOWCASE');
      setTimeout(() => {
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00FFA3] selection:text-black overflow-x-hidden">
      {/* Floating Navbar (Apple x Nothing) */}
      <Navbar onOpenDiary={handleOpenDiary} onNavigateSection={handleNavigateSection} />

      {currentView === 'DIARY' ? (
        <AntigravityDiary onBack={handleBackToShowcase} />
      ) : (
        <>
          {/* Main Showcase Content */}
          <main>
            {/* Section 1: Hero Section */}
            <Hero onOpenDiary={handleOpenDiary} />

            {/* Section 2: Engineering Engine (Dyson Schematic Flow) */}
            <EngineeringEngine />

            {/* Section 3: Product Ecosystem Showcase (DAF, NAE, MSAI, AGAMS) */}
            <EcosystemShowcase />

            {/* Section 4: Developer Matrix */}
            <DeveloperMatrix />
          </main>

          {/* Section 5: Call to Action & Telemetry Footer */}
          <CallToActionFooter onOpenDiary={handleOpenDiary} />
        </>
      )}
    </div>
  );
};

export default App;
