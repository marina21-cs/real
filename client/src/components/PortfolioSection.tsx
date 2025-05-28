import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  const portfolioItems = [
    {
      title: 'Project Title 1',
      description: '[Add your project description here]',
      icon: '🚀'
    },
    {
      title: 'Project Title 2',
      description: '[Add your project description here]',
      icon: '🎯'
    },
    {
      title: 'Project Title 3',
      description: '[Add your project description here]',
      icon: '⚡'
    },
  ];

  return (
    <section id="portfolio" className="cyber-section">
      <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`} ref={sectionRef}>
        <h2 className="cyber-title">My Work</h2>
      </div>
      
      <div className="cyber-portfolio-grid">
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            className={`cyber-portfolio-item section-reveal ${isVisible ? 'revealed' : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="portfolio-image">{item.icon}</div>
            <div className="portfolio-content">
              <h3>{item.title}</h3>
              <p style={{ fontFamily: 'Rajdhani, monospace', color: 'rgba(255, 255, 255, 0.9)' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="cyber-cta-button"
        >
          Let's Work Together
        </button>
      </div>
    </section>
  );
}
