import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Hotel, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Activity,
  DollarSign,
  TrendingUp,
  UserCheck,
  Building,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import AdminSystemSettingsDialog from '@/components/AdminSystemSettingsDialog';
import AdminAddUserDialog from '@/components/AdminAddUserDialog';
import AdminUserActionDialog from '@/components/AdminUserActionDialog';
import AdminHotelActionDialog from '@/components/AdminHotelActionDialog';

const Admin = () => {
  const { language } = useAppMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Données fictives pour la démonstration
  const users = [
    {
      id: 1,
      name: 'Kouamé Jean',
      email: 'kouame.jean@email.com',
      role: 'hotel_manager',
      status: 'active',
      lastLogin: '2024-01-10'
    },
    {
      id: 2,
      name: 'Marie Diallo',
      email: 'marie.diallo@email.com',
      role: 'customer',
      status: 'active',
      lastLogin: '2024-01-09'
    },
    {
      id: 3,
      name: 'Pierre Yao',
      email: 'pierre.yao@email.com',
      role: 'hotel_manager',
      status: 'pending',
      lastLogin: '2024-01-08'
    }
  ];

  const hotelRequests = [
    {
      id: 1,
      hotelName: 'Grand Hotel Bassam',
      ownerName: 'Ibrahim Touré',
      location: 'Grand-Bassam, Côte d\'Ivoire',
      status: 'pending',
      submittedDate: '2024-01-08',
      documents: 3
    },
    {
      id: 2,
      hotelName: 'Resort de Man',
      ownerName: 'Fatou Kone',
      location: 'Man, Côte d\'Ivoire',
      status: 'approved',
      submittedDate: '2024-01-05',
      documents: 5
    }
  ];

  const systemStats = {
    totalUsers: 1247,
    totalHotels: 89,
    totalBookings: 3456,
    monthlyRevenue: '15,230,000 FCFA',
    systemHealth: 98.5,
    activeIssues: 2
  };

  const getRoleText = (role: string) => {
    const roleMap: { [key: string]: { fr: string; en: string } } = {
      admin: { fr: 'Administrateur', en: 'Administrator' },
      hotel_manager: { fr: 'Gestionnaire d\'Hôtel', en: 'Hotel Manager' },
      customer: { fr: 'Client', en: 'Customer' },
      support: { fr: 'Support', en: 'Support' }
    };
    return language === 'en' ? roleMap[role]?.en || role : roleMap[role]?.fr || role;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { fr: string; en: string } } = {
      active: { fr: 'Actif', en: 'Active' },
      inactive: { fr: 'Inactif', en: 'Inactive' },
      pending: { fr: 'En attente', en: 'Pending' },
      approved: { fr: 'Approuvé', en: 'Approved' },
      rejected: { fr: 'Rejeté', en: 'Rejected' },
      suspended: { fr: 'Suspendu', en: 'Suspended' }
    };
    return language === 'en' ? statusMap[status]?.en || status : statusMap[status]?.fr || status;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'en' ? 'Back to Home' : 'Retour Accueil'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                {language === 'en' ? 'Admin Dashboard' : 'Tableau de Bord Admin'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {language === 'en' 
                  ? 'System administration and user management' 
                  : 'Administration système et gestion des utilisateurs'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <AdminSystemSettingsDialog>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                {language === 'en' ? 'System Settings' : 'Paramètres Système'}
              </Button>
            </AdminSystemSettingsDialog>
            <AdminAddUserDialog>
              <Button className="gradient-ivorian">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Add User' : 'Ajouter Utilisateur'}
              </Button>
            </AdminAddUserDialog>
          </div>
        </div>

        {/* System Health Alert */}
        {systemStats.activeIssues > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">
                    {language === 'en' ? 'System Alert' : 'Alerte Système'}
                  </p>
                  <p className="text-sm text-orange-700">
                    {language === 'en' 
                      ? `${systemStats.activeIssues} active issues require attention` 
                      : `${systemStats.activeIssues} problèmes actifs nécessitent votre attention`}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  {language === 'en' ? 'View Issues' : 'Voir Problèmes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Users' : 'Utilisateurs Total'}
                  </p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% {language === 'en' ? 'this month' : 'ce mois'}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Hotels' : 'Hôtels Total'}
                  </p>
                  <p className="text-2xl font-bold">{systemStats.totalHotels}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +5% {language === 'en' ? 'this month' : 'ce mois'}
                  </p>
                </div>
                <Hotel className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Bookings' : 'Réservations Total'}
                  </p>
                  <p className="text-2xl font-bold">{systemStats.totalBookings.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% {language === 'en' ? 'this month' : 'ce mois'}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'System Health' : 'Santé Système'}
                  </p>
                  <p className="text-2xl font-bold">{systemStats.systemHealth}%</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <Activity className="w-3 h-3" />
                    {language === 'en' ? 'Excellent' : 'Excellent'}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">
              {language === 'en' ? 'Dashboard' : 'Tableau de Bord'}
            </TabsTrigger>
            <TabsTrigger value="users">
              {language === 'en' ? 'Users' : 'Utilisateurs'}
            </TabsTrigger>
            <TabsTrigger value="hotels">
              {language === 'en' ? 'Hotels' : 'Hôtels'}
            </TabsTrigger>
            <TabsTrigger value="reports">
              {language === 'en' ? 'Reports' : 'Rapports'}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {language === 'en' ? 'Settings' : 'Paramètres'}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Recent Activities' : 'Activités Récentes'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'New user registered' : 'Nouvel utilisateur enregistré'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' ? '2 minutes ago' : 'Il y a 2 minutes'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Hotel approval request' : 'Demande d\'approbation d\'hôtel'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' ? '1 hour ago' : 'Il y a 1 heure'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Pending Actions' : 'Actions en Attente'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {language === 'en' ? 'Hotel Approvals' : 'Approbations d\'Hôtels'}
                        </p>
                        <p className="text-sm text-muted-foreground">3 {language === 'en' ? 'pending' : 'en attente'}</p>
                      </div>
                      <Button size="sm">
                        {language === 'en' ? 'Review' : 'Examiner'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {language === 'en' ? 'User Reports' : 'Signalements d\'Utilisateurs'}
                        </p>
                        <p className="text-sm text-muted-foreground">2 {language === 'en' ? 'new' : 'nouveaux'}</p>
                      </div>
                      <Button size="sm">
                        {language === 'en' ? 'Review' : 'Examiner'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language === 'en' ? 'User Management' : 'Gestion des Utilisateurs'}
              </h2>
              <div className="flex gap-2">
                <Input 
                  placeholder={language === 'en' ? 'Search users...' : 'Rechercher des utilisateurs...'}
                  className="w-64"
                />
                <Button variant="outline">
                  {language === 'en' ? 'Filter' : 'Filtrer'}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{getRoleText(user.role)}</Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {getStatusText(user.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Last login:' : 'Dernière connexion:'} {user.lastLogin}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <AdminUserActionDialog user={user} action="view">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              {language === 'en' ? 'View' : 'Voir'}
                            </Button>
                          </AdminUserActionDialog>
                          <AdminUserActionDialog user={user} action="edit">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              {language === 'en' ? 'Edit' : 'Modifier'}
                            </Button>
                          </AdminUserActionDialog>
                          <AdminUserActionDialog user={user} action="delete">
                            <Button variant="outline" size="sm" className="text-destructive border-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AdminUserActionDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language === 'en' ? 'Hotel Approval Requests' : 'Demandes d\'Approbation d\'Hôtels'}
              </h2>
            </div>

            <div className="space-y-4">
              {hotelRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold">{request.hotelName}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Owner:' : 'Propriétaire:'} {request.ownerName}
                        </p>
                        <p className="text-sm text-muted-foreground">{request.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Submitted:' : 'Soumis:'} {request.submittedDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-2">
                          {request.documents} {language === 'en' ? 'documents' : 'documents'}
                        </p>
                        <div className="flex gap-2">
                          <AdminHotelActionDialog request={request} action="view">
                            <Button variant="outline" size="sm">
                              {language === 'en' ? 'View Details' : 'Voir Détails'}
                            </Button>
                          </AdminHotelActionDialog>
                          {request.status === 'pending' && (
                            <>
                              <AdminHotelActionDialog request={request} action="approve">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  {language === 'en' ? 'Approve' : 'Approuver'}
                                </Button>
                              </AdminHotelActionDialog>
                              <AdminHotelActionDialog request={request} action="reject">
                                <Button variant="outline" size="sm" className="text-destructive border-destructive">
                                  {language === 'en' ? 'Reject' : 'Rejeter'}
                                </Button>
                              </AdminHotelActionDialog>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Revenue Analytics' : 'Analyses des Revenus'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{systemStats.monthlyRevenue}</div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Total platform revenue this month' : 'Revenus totaux de la plateforme ce mois'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Platform Growth' : 'Croissance de la Plateforme'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">+15.2%</div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Monthly active users growth' : 'Croissance des utilisateurs actifs mensuels'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'System Configuration' : 'Configuration Système'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage platform settings and configurations' 
                    : 'Gérer les paramètres et configurations de la plateforme'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform-name">
                      {language === 'en' ? 'Platform Name' : 'Nom de la Plateforme'}
                    </Label>
                    <Input id="platform-name" value="Hotro de Babi" />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-mode">
                      {language === 'en' ? 'Maintenance Mode' : 'Mode Maintenance'}
                    </Label>
                    <Button variant="outline" className="w-full justify-start">
                      {language === 'en' ? 'Disabled' : 'Désactivé'}
                    </Button>
                  </div>
                </div>
                <Button>
                  {language === 'en' ? 'Save Changes' : 'Sauvegarder les Modifications'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;