import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Plus, Settings, ArrowLeft, BarChart3, Users, Hotel, FileText, Cog, Crown } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminSystemSettingsDialog from '@/components/AdminSystemSettingsDialog';
import AdminAddUserDialog from '@/components/AdminAddUserDialog';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminHotels from '@/components/admin/AdminHotels';
import AdminSubscriptions from '@/components/admin/AdminSubscriptions';
import AdminReports from '@/components/admin/AdminReports';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import { systemStats } from '@/data/adminMockData';

const Admin = () => {
  const { language } = useAppMode();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('dashboard');

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
        <AdminStatsCards />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Board' : 'Bord')
                : (language === 'en' ? 'Dashboard' : 'Tableau de Bord')
              }
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Users' : 'Users')
                : (language === 'en' ? 'Users' : 'Utilisateurs')
              }
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-1">
              <Hotel className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Hotels' : 'Hôtels')
                : (language === 'en' ? 'Hotels' : 'Hôtels')
              }
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-1">
              <Crown className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Subs' : 'Abos')
                : (language === 'en' ? 'Subscriptions' : 'Abonnements')
              }
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Reports' : 'Stats')
                : (language === 'en' ? 'Reports' : 'Rapports')
              }
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Cog className="w-4 h-4" />
              {isMobile 
                ? (language === 'en' ? 'Config' : 'Config')
                : (language === 'en' ? 'Settings' : 'Paramètres')
              }
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <AdminUsers />
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <AdminHotels />
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <AdminSubscriptions />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <AdminReports />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;