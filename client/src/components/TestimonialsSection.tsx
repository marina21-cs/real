import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';
import { User } from 'lucide-react';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);

  const testimonials = [
    {
      name: 'Client Name',
      role: 'Company CEO',
      content: 'Exceptional work quality and professional service. Highly recommended for any creative project.',
    },
    {
      name: 'Client Name',
      role: 'Marketing Director',
      content: 'Delivered beyond our expectations with creativity and technical excellence. Amazing results!',
    },
    {
      name: 'Client Name',
      role: 'Startup Founder',
      content: 'Professional, timely, and innovative. Transformed our vision into reality perfectly.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-600 to-amber-500">
      <div className="container mx-auto px-6">
        <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Clients Say</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Testimonials from satisfied clients who trust my work
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card section-reveal p-6 rounded-2xl text-white ${
                isVisible ? 'revealed' : ''
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-white/70">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white/90 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
