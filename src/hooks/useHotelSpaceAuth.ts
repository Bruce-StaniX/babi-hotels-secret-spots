import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

export const useHotelSpaceAuth = () => {
  const { toast } = useToast();
  const { language } = useAppMode();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserHotels();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to fetch your hotels' : 'Impossible de charger vos hôtels',
        variant: 'destructive',
      });
    }
  };

  const signInWithEmail = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!email) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Please enter your email address' : 'Veuillez saisir votre adresse email',
        variant: 'destructive',
      });
      return;
    }

    setSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/hotel-space'
        }
      });
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Check your email' : 'Vérifiez votre email',
        description: language === 'en' ? 'A sign-in link has been sent to your email' : 'Un lien de connexion a été envoyé à votre email',
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: error.message || (language === 'en' ? 'Failed to send sign-in link' : 'Impossible d\'envoyer le lien de connexion'),
        variant: 'destructive',
      });
    } finally {
      setSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setHotels([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    hotels,
    loading,
    isAuthenticated,
    user,
    email,
    setEmail,
    signingIn,
    signInWithEmail,
    signOut,
    fetchUserHotels
  };
};