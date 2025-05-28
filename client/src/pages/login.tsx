import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';

type LoginData = {
  username: string;
  password: string;
};

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return await apiRequest('POST', '/api/login', data);
    },
    onSuccess: () => {
      toast({
        title: 'Login successful!',
        description: 'Welcome to the admin dashboard.',
      });
      setLocation('/admin');
    },
    onError: (error: any) => {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cyber-bg)' }}>
      <div className="cyber-service-card max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron, monospace', color: 'var(--cyber-gold)' }}>
            Admin Access
          </h1>
          <p style={{ fontFamily: 'Rajdhani, monospace', color: 'rgba(255, 255, 255, 0.9)' }}>
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="cyber-form-group">
            <input
              type="text"
              placeholder="Username"
              {...form.register('username')}
              disabled={loginMutation.isPending}
              required
            />
          </div>

          <div className="cyber-form-group">
            <input
              type="password"
              placeholder="Password"
              {...form.register('password')}
              disabled={loginMutation.isPending}
              required
            />
          </div>

          <button 
            type="submit" 
            className="cyber-cta-button w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setLocation('/')}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
            style={{ fontFamily: 'Rajdhani, monospace' }}
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}