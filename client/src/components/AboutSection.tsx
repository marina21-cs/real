import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';
import { CheckCircle, User, Linkedin, ExternalLink } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: ExternalLink, href: 'https://behance.net', label: 'Behance' },
    { icon: ExternalLink, href: 'https://dribbble.com', label: 'Dribbble' },
  ];

  const features = [
    'Innovative problem-solving approach',
    'Attention to detail and quality',
    'Timely delivery and communication',
    'Continuous learning and adaptation',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate freelancer dedicated to bringing your creative visions to life. With years of experience 
            in design and development, I transform complex ideas into beautiful, functional solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`section-reveal ${isVisible ? 'revealed' : ''}`}>
            <div className="bg-gradient-to-br from-blue-600 to-amber-500 rounded-2xl h-96 flex items-center justify-center text-white">
              <User size={120} />
            </div>
          </div>
          <div className={`section-reveal space-y-6 ${isVisible ? 'revealed' : ''}`}>
            <h3 className="text-2xl font-bold text-slate-800">Why Choose Me?</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Connect With Me:</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
