import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Hotel, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppMode } from '@/hooks/useAppMode';
import { useHotelSpaceAuth } from '@/hooks/useHotelSpaceAuth';
import Navigation from '@/components/Navigation';
import AddHotelDialog from '@/components/admin/AddHotelDialog';
import { HotelSpaceSignIn } from '@/components/HotelSpaceSignIn';
import { HotelSpaceStatsCards } from '@/components/HotelSpaceStatsCards';
import { HotelSpaceHotelsList } from '@/components/HotelSpaceHotelsList';
import { HotelSpaceQuickActions } from '@/components/HotelSpaceQuickActions';

const HotelSpace = () => {
  const navigate = useNavigate();
  const { language } = useAppMode();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const {
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
  } = useHotelSpaceAuth();

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

          <HotelSpaceSignIn
            email={email}
            setEmail={setEmail}
            signingIn={signingIn}
            onSignIn={signInWithEmail}
          />
        </div>
      </div>
    );
  }

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
            <HotelSpaceStatsCards hotels={hotels} />
            <HotelSpaceQuickActions 
              onViewAnalytics={() => setActiveTab('analytics')}
              onHotelAdded={fetchUserHotels}
              userEmail={user?.email}
            />
          </TabsContent>

          <TabsContent value="hotels" className="space-y-4">
            <HotelSpaceHotelsList hotels={hotels} onHotelUpdated={fetchUserHotels} />
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