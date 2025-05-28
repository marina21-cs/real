import { useState, useEffect } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      setScrolled(window.scrollY > 100);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`floating-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="text-2xl font-bold" style={{ fontFamily: 'Orbitron, monospace', background: 'linear-gradient(45deg, #ffd700, #ffed4e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Lorenz Gabriel Velasco
        </div>
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all relative ${
                activeSection === item.id
                  ? 'text-yellow-400'
                  : 'text-white hover:text-yellow-400'
              }`}
              style={{ fontFamily: 'Rajdhani, monospace', fontWeight: 600 }}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-yellow-400 shadow-yellow-400" style={{ boxShadow: '0 0 10px #ffd700' }}></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
