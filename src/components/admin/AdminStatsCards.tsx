import { Card, CardContent } from '@/components/ui/card';
import { Users, Hotel, BarChart3, Shield, TrendingUp, Activity } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { systemStats } from '@/data/adminMockData';

const AdminStatsCards = () => {
  const { language } = useAppMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
};

export default AdminStatsCards;