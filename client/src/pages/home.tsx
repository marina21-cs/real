import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ExternalLinksSection from '@/components/ExternalLinksSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollPercent = (scrolled / documentHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
        }}
      />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-20 h-20 rounded-full border border-yellow-400/10 animate-pulse"
          style={{ top: '20%', left: '10%' }}
        />
        <div 
          className="absolute w-32 h-32 rounded-full border border-yellow-400/10 animate-pulse"
          style={{ top: '60%', left: '80%', animationDelay: '2s' }}
        />
        <div 
          className="absolute w-16 h-16 rounded-full border border-yellow-400/10 animate-pulse"
          style={{ top: '80%', left: '20%', animationDelay: '4s' }}
        />
      </div>

      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ExternalLinksSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
