import CharacterAnimation from './CharacterAnimation';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full border border-yellow-400/20 top-1/4 left-1/10 animate-pulse"></div>
        <div className="absolute w-32 h-32 rounded-full border border-yellow-400/20 top-3/5 left-4/5 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-16 h-16 rounded-full border border-yellow-400/20 top-4/5 left-1/5 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <CharacterAnimation />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`section-reveal ${isVisible ? 'revealed' : ''}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>
            <span className="gradient-text">Lorenz Gabriel Velasco</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90" style={{ fontFamily: 'Rajdhani, monospace', fontWeight: 400, letterSpacing: '1px' }}>
            Computer Science Student, Web Developer and Machine Learning Developer
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-cta-button"
          >
            Let's Work Together
          </button>
        </div>
      </div>
    </section>
  );
}
