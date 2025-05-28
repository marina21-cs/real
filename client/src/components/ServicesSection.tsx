import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies. [Add your specific details here]'
    },
    {
      icon: '🎨',
      title: 'Design Services',
      description: 'Creative design solutions for your brand and digital presence. [Add your specific details here]'
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android. [Add your specific details here]'
    },
  ];

  return (
    <section id="services" className="cyber-section">
      <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`} ref={sectionRef}>
        <h2 className="cyber-title">My Services</h2>
      </div>
      
      <div className="cyber-services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`cyber-service-card section-reveal ${
              isVisible ? 'revealed' : ''
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p style={{ fontFamily: 'Rajdhani, monospace', color: 'rgba(255, 255, 255, 0.9)' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
