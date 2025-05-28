import { useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactSchema } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { z } from 'zod';

type ContactFormData = z.infer<typeof insertContactSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: 'Message sent!',
        description: "Thank you for your message! I'll get back to you soon.",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="cyber-section">
      <div className={`section-reveal text-center mb-16 ${isVisible ? 'revealed' : ''}`} ref={sectionRef}>
        <h2 className="cyber-title">Get In Touch</h2>
      </div>
      
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className={`cyber-contact-form section-reveal ${
          isVisible ? 'revealed' : ''
        }`}
      >
        <div className="cyber-form-group">
          <input
            type="text"
            placeholder="Your Name"
            {...form.register('name')}
            disabled={contactMutation.isPending}
            required
          />
          {form.formState.errors.name && (
            <p style={{ color: '#ffd700', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        
        <div className="cyber-form-group">
          <input
            type="email"
            placeholder="your.email@example.com"
            {...form.register('email')}
            disabled={contactMutation.isPending}
            required
          />
          {form.formState.errors.email && (
            <p style={{ color: '#ffd700', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        
        <div className="cyber-form-group">
          <input
            type="text"
            placeholder="Subject"
            {...form.register('subject')}
            disabled={contactMutation.isPending}
            required
          />
          {form.formState.errors.subject && (
            <p style={{ color: '#ffd700', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {form.formState.errors.subject.message}
            </p>
          )}
        </div>
        
        <div className="cyber-form-group">
          <textarea
            rows={5}
            placeholder="Tell me about your project..."
            {...form.register('message')}
            disabled={contactMutation.isPending}
            required
          />
          {form.formState.errors.message && (
            <p style={{ color: '#ffd700', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {form.formState.errors.message.message}
            </p>
          )}
        </div>
        
        <div className="cyber-form-group">
          <button 
            type="submit" 
            className="cyber-cta-button w-full"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
      
      {showSuccess && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 215, 0, 0.1)',
          border: '2px solid #ffd700',
          color: '#ffd700',
          borderRadius: '0',
          backdropFilter: 'blur(10px)',
          maxWidth: '600px',
          margin: '1.5rem auto 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle size={20} style={{ marginRight: '0.5rem' }} />
            <span>Message sent successfully! I'll get back to you soon.</span>
          </div>
        </div>
      )}
    </section>
  );
}
