import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Contact } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, User, Calendar, MessageSquare, LogOut } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

export default function Admin() {
  const [, setLocation] = useLocation();

  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ['/api/auth-status'],
    queryFn: getQueryFn<{ authenticated: boolean }>({ on401: 'returnNull' }),
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (authStatus && !authStatus.authenticated) {
      setLocation('/login');
    }
  }, [authStatus, setLocation]);

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: getQueryFn<Contact[]>({ on401: 'throw' }),
    enabled: authStatus?.authenticated === true,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/logout', {});
    },
    onSuccess: () => {
      setLocation('/');
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading contact submissions</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Contact Submissions</h1>
            <p className="text-gray-600">View and manage client inquiries</p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-2"
              disabled={logoutMutation.isPending}
            >
              <LogOut size={16} />
              Logout
            </Button>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Website
              </Button>
            </Link>
          </div>
        </div>

        {!contacts || contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No submissions yet</h3>
              <p className="text-gray-500">Contact form submissions will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                {contacts.length} total submission{contacts.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="grid gap-6">
              {contacts
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((contact) => (
                  <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-600 text-white p-2 rounded-full">
                            <User size={16} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{contact.name}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Mail size={14} />
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(contact.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">#{contact.id}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Subject:</h4>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{contact.subject}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Message:</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank')}
                          >
                            <Mail size={14} className="mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}