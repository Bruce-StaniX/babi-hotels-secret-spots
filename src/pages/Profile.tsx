import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Edit, Heart, MessageCircle, MapPin, Star, Settings, Shield, LogOut, Users, Eye, EyeOff } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ModeSelector from '@/components/ModeSelector';
import { useAppMode } from '@/hooks/useAppMode';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModeDialogOpen, setIsModeDialogOpen] = useState(false);
  const { mode, setMode } = useAppMode();
  const [profile, setProfile] = useState({
    name: "Jean Kouassi",
    email: "jean.kouassi@email.com",
    phone: "+225 07 12 34 56 78",
    location: "Cocody, Abidjan"
  });

  // Fonction pour obtenir les infos du mode actuel
  const getModeInfo = () => {
    switch (mode) {
      case 'couple':
        return {
          icon: Users,
          label: 'Mode Couple Discret',
          description: 'Recommandations privées spécialement sélectionnées',
          color: 'bg-orange-500/10 text-orange-700 border-orange-200'
        };
      case 'private':
        return {
          icon: EyeOff,
          label: 'Mode Privé',
          description: 'Historique effacé + captures d\'écran bloquées',
          color: 'bg-red-500/10 text-red-700 border-red-200'
        };
      default:
        return {
          icon: Shield,
          label: 'Mode Normal',
          description: 'Navigation standard avec toutes les fonctionnalités',
          color: 'bg-blue-500/10 text-blue-700 border-blue-200'
        };
    }
  };

  const currentModeInfo = getModeInfo();
  const ModeIcon = currentModeInfo.icon;

  const stats = [
    { label: "Réservations", value: "12", icon: MapPin },
    { label: "Favoris", value: "8", icon: Heart },
    { label: "Avis donnés", value: "15", icon: Star },
    { label: "Messages", value: "24", icon: MessageCircle }
  ];

  const recentBookings = [
    {
      id: 1,
      name: "Villa Romance Cocody",
      date: "15 Dec 2024",
      status: "Confirmé",
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png"
    },
    {
      id: 2,
      name: "Suite Présidentielle",
      date: "20 Nov 2024",
      status: "Terminé",
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode de navigation actuel */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ModeIcon className="w-5 h-5 mr-2" />
                  Mode de navigation actuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg border ${currentModeInfo.color}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{currentModeInfo.label}</h3>
                      <p className="text-sm text-muted-foreground">{currentModeInfo.description}</p>
                    </div>
                    <Dialog open={isModeDialogOpen} onOpenChange={setIsModeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Changer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md glass-morphism">
                        <DialogHeader>
                          <DialogTitle>Choisir votre mode</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <ModeSelector 
                            currentMode={mode} 
                            onModeChange={(newMode) => {
                              setMode(newMode);
                              setIsModeDialogOpen(false);
                            }} 
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations personnelles
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground">Nom complet</label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Téléphone</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Localisation</label>
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={() => setIsEditing(false)}>
                      Sauvegarder
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p className="font-medium text-foreground">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium text-foreground">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="font-medium text-foreground">{profile.location}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Réservations récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <img
                        src={booking.image}
                        alt={booking.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{booking.name}</h4>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <Badge variant={booking.status === 'Confirmé' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/20">
                        <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Paramètres
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-3" />
                  Confidentialité
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-3" />
                  Mes favoris
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </Button>
              </CardContent>
            </Card>

            {/* Premium Badge */}
            <Card className="glass-morphism bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Membre VIP</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Profitez d'avantages exclusifs
                </p>
                <Button size="sm" className="w-full">
                  Voir les avantages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;