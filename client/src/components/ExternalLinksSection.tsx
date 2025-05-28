import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';

export default function ExternalLinksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  const externalLinks = [
    {
      title: 'GitHub Portfolio',
      href: 'https://github.com',
    },
    {
      title: 'LinkedIn Profile',
      href: 'https://linkedin.com',
    },
    {
      title: 'Design Portfolio',
      href: 'https://dribbble.com',
    },
  ];

  return (
    <section className="cyber-section">
      <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`} ref={sectionRef}>
        <h2 className="cyber-title">Connect With Me</h2>
      </div>
      
      <div className="cyber-external-links">
        {externalLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`cyber-external-link section-reveal ${
              isVisible ? 'revealed' : ''
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {link.title}
          </a>
        ))}
      </div>
    </section>
  );
}