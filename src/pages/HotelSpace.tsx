import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Hotel, BarChart3, Settings, Eye, Edit, TrendingUp, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import AddHotelDialog from '@/components/admin/AddHotelDialog';
import EditHotelDialog from '@/components/admin/EditHotelDialog';
import ViewHotelDialog from '@/components/admin/ViewHotelDialog';
import { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

const HotelSpace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useAppMode();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: language === 'en' ? 'Pending Review' : 'En attente de validation',
      approved: language === 'en' ? 'Approved' : 'Approuvé',
      active: language === 'en' ? 'Active' : 'Actif',
      rejected: language === 'en' ? 'Rejected' : 'Rejeté',
      suspended: language === 'en' ? 'Suspended' : 'Suspendu'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            {language === 'en' ? 'Loading...' : 'Chargement...'}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-3">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Hotel Owner Space' : 'Espace Hôtelier'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' ? 'Manage your hotels and bookings' : 'Gérez vos hôtels et réservations'}
              </p>
            </div>
          </div>

          <Card className="max-w-md mx-auto mt-12">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Hotel className="w-6 h-6" />
                {language === 'en' ? 'Sign In Required' : 'Connexion Requise'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                {language === 'en' 
                  ? 'Please sign in to access your hotel management dashboard' 
                  : 'Veuillez vous connecter pour accéder à votre tableau de bord hôtelier'}
              </p>
              <form onSubmit={signInWithEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email Address' : 'Adresse Email'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === 'en' ? 'Enter your email' : 'Saisissez votre email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={signingIn}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={signingIn}>
                  {signingIn 
                    ? (language === 'en' ? 'Sending...' : 'Envoi...') 
                    : (language === 'en' ? 'Sign In with Email' : 'Se connecter par Email')
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const stats = {
    total: hotels.length,
    active: hotels.filter(h => h.status === 'active' || h.status === 'approved').length,
    pending: hotels.filter(h => h.status === 'pending').length,
    revenue: hotels.reduce((sum, h) => sum + (h.rating || 0) * 100, 0) // Mock revenue calculation
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-3">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Hotel Owner Dashboard' : 'Tableau de Bord Hôtelier'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' ? 'Welcome back,' : 'Bienvenue,'} {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AddHotelDialog onHotelAdded={fetchUserHotels}>
              <Button className="gradient-ivorian">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Add Hotel' : 'Ajouter Hôtel'}
              </Button>
            </AddHotelDialog>
            <Button variant="outline" onClick={signOut}>
              {language === 'en' ? 'Sign Out' : 'Déconnexion'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Dashboard' : 'Tableau de Bord'}
            </TabsTrigger>
            <TabsTrigger value="hotels">
              <Hotel className="w-4 h-4 mr-2" />
              {language === 'en' ? 'My Hotels' : 'Mes Hôtels'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Analytics' : 'Analyses'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Hotel className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Total Hotels' : 'Total Hôtels'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.active}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Active Hotels' : 'Hôtels Actifs'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.pending}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Pending Approval' : 'En Attente'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.revenue}€</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Est. Revenue' : 'Revenus Est.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Quick Actions' : 'Actions Rapides'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    {language === 'en' ? 'Add New Hotel' : 'Ajouter Hôtel'}
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    {language === 'en' ? 'View Analytics' : 'Voir Analyses'}
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="w-6 h-6 mb-2" />
                    {language === 'en' ? 'Account Settings' : 'Paramètres'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-4">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <Card key={hotel.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-lg">{hotel.name}</h3>
                          <Badge className={getStatusColor(hotel.status)}>
                            {getStatusText(hotel.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{hotel.description}</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          📍 {hotel.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ⭐ {hotel.rating}/5 ({hotel.review_count} {language === 'en' ? 'reviews' : 'avis'})
                        </p>
                        {hotel.admin_notes && (
                          <p className="text-sm text-orange-600 mt-2">
                            <strong>{language === 'en' ? 'Admin Notes:' : 'Notes Admin:'}</strong> {hotel.admin_notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <ViewHotelDialog hotel={hotel}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            {language === 'en' ? 'View' : 'Voir'}
                          </Button>
                        </ViewHotelDialog>
                        <EditHotelDialog hotel={hotel} onHotelUpdated={fetchUserHotels}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            {language === 'en' ? 'Edit' : 'Modifier'}
                          </Button>
                        </EditHotelDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Hotel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'en' ? 'No hotels yet' : 'Aucun hôtel pour le moment'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'Start by adding your first hotel to get started' 
                      : 'Commencez par ajouter votre premier hôtel'}
                  </p>
                  <AddHotelDialog onHotelAdded={fetchUserHotels}>
                    <Button className="gradient-ivorian">
                      <Plus className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Add Your First Hotel' : 'Ajouter Votre Premier Hôtel'}
                    </Button>
                  </AddHotelDialog>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Analytics Dashboard' : 'Tableau de Bord Analytics'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'en' ? 'Analytics Coming Soon' : 'Analytics Bientôt Disponible'}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'Detailed analytics and reporting features will be available soon' 
                      : 'Les fonctionnalités d\'analyse détaillée seront bientôt disponibles'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HotelSpace;