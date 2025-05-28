import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function CharacterAnimation() {
  const scrollY = useScrollAnimation();
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    const threshold = 200;
    setIsTransformed(scrollY > threshold);
  }, [scrollY]);

  useEffect(() => {
    const character = document.getElementById('character');
    if (character) {
      const rate = scrollY * -0.5;
      if (scrollY > 200) {
        character.style.transform = `translateY(${rate}px) rotateY(${scrollY * 0.1}deg)`;
      } else {
        character.style.transform = `translateY(${rate}px)`;
      }
    }
  }, [scrollY]);

  return (
    <div className="character-container">
      <div id="character" className={`character ${isTransformed ? 'cat-mode' : ''}`}>
        <div className="person">
          <svg className="person-svg" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="100" cy="50" r="25" fill="#ffdbac"/>
            {/* Batman Mask */}
            <path d="M75 35 Q85 25 100 30 Q115 25 125 35 Q125 45 120 50 Q110 45 100 50 Q90 45 80 50 Q75 45 75 35" fill="#000"/>
            {/* Eye holes */}
            <ellipse cx="88" cy="42" rx="6" ry="8" fill="#ffdbac"/>
            <ellipse cx="112" cy="42" rx="6" ry="8" fill="#ffdbac"/>
            {/* Hair */}
            <path d="M75 30 Q100 15 125 30 Q130 40 125 50 Q100 45 75 50 Q70 40 75 30" fill="#000"/>
            {/* Body (Batman suit) */}
            <rect x="85" y="75" width="30" height="60" fill="#1a1a1a" rx="15"/>
            {/* Batman Logo */}
            <path d="M95 85 Q100 80 105 85 Q103 90 100 88 Q97 90 95 85" fill="#ffd700"/>
            {/* Arms */}
            <rect x="60" y="85" width="20" height="40" fill="#1a1a1a" rx="10"/>
            <rect x="120" y="85" width="20" height="40" fill="#1a1a1a" rx="10"/>
            {/* Legs */}
            <rect x="90" y="135" width="8" height="50" fill="#000" rx="4"/>
            <rect x="102" y="135" width="8" height="50" fill="#000" rx="4"/>
            {/* Eyes */}
            <circle cx="88" cy="42" r="2" fill="#000"/>
            <circle cx="112" cy="42" r="2" fill="#000"/>
            {/* Cape */}
            <path d="M85 75 Q70 80 75 120 Q80 130 85 125 L85 75" fill="#1a1a1a"/>
            <path d="M115 75 Q130 80 125 120 Q120 130 115 125 L115 75" fill="#1a1a1a"/>
          </svg>
        </div>
        <div className="cat">
          <svg className="cat-svg" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            {/* Cat Body (Batman Cat) */}
            <ellipse cx="100" cy="160" rx="35" ry="45" fill="#1a1a1a"/>
            {/* Cat Head */}
            <circle cx="100" cy="80" r="30" fill="#1a1a1a"/>
            {/* Bat Ears */}
            <polygon points="75,50 85,25 95,45" fill="#1a1a1a"/>
            <polygon points="125,50 115,25 105,45" fill="#1a1a1a"/>
            {/* Inner ears */}
            <polygon points="80,45 87,35 92,42" fill="#333"/>
            <polygon points="120,45 113,35 108,42" fill="#333"/>
            {/* Eyes (glowing) */}
            <ellipse cx="90" cy="75" rx="4" ry="6" fill="#ffd700"/>
            <ellipse cx="110" cy="75" rx="4" ry="6" fill="#ffd700"/>
            {/* Eye shine */}
            <ellipse cx="91" cy="73" rx="1" ry="2" fill="#fff"/>
            <ellipse cx="111" cy="73" rx="1" ry="2" fill="#fff"/>
            {/* Nose */}
            <polygon points="100,82 97,85 103,85" fill="#ffd700"/>
            {/* Mouth */}
            <path d="M100 87 Q95 90 90 87" stroke="#ffd700" strokeWidth="1.5" fill="none"/>
            <path d="M100 87 Q105 90 110 87" stroke="#ffd700" strokeWidth="1.5" fill="none"/>
            {/* Whiskers (golden) */}
            <line x1="70" y1="80" x2="85" y2="82" stroke="#ffd700" strokeWidth="1"/>
            <line x1="70" y1="87" x2="85" y2="87" stroke="#ffd700" strokeWidth="1"/>
            <line x1="115" y1="82" x2="130" y2="80" stroke="#ffd700" strokeWidth="1"/>
            <line x1="115" y1="87" x2="130" y2="87" stroke="#ffd700" strokeWidth="1"/>
            {/* Tail */}
            <path d="M135 150 Q160 140 165 120 Q170 100 160 85" stroke="#1a1a1a" strokeWidth="8" fill="none"/>
            {/* Paws */}
            <ellipse cx="80" cy="200" rx="8" ry="12" fill="#1a1a1a"/>
            <ellipse cx="120" cy="200" rx="8" ry="12" fill="#1a1a1a"/>
            <ellipse cx="85" cy="220" rx="6" ry="10" fill="#1a1a1a"/>
            <ellipse cx="115" cy="220" rx="6" ry="10" fill="#1a1a1a"/>
            {/* Batman logo on chest */}
            <path d="M95 150 Q100 145 105 150 Q103 155 100 153 Q97 155 95 150" fill="#ffd700"/>
            {/* Cape */}
            <path d="M135 130 Q150 125 155 140 Q160 160 140 170 Q135 165 135 150" fill="#1a1a1a"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
