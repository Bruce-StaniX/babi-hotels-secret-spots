import { Card, CardContent } from '@/components/ui/card';
import { Hotel, TrendingUp, Calendar, Users } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

interface HotelSpaceStatsCardsProps {
  hotels: Hotel[];
}

export const HotelSpaceStatsCards = ({ hotels }: HotelSpaceStatsCardsProps) => {
  const { language } = useAppMode();

  const stats = {
    total: hotels.length,
    active: hotels.filter(h => h.status === 'active' || h.status === 'approved').length,
    pending: hotels.filter(h => h.status === 'pending').length,
    revenue: hotels.reduce((sum, h) => sum + (h.rating || 0) * 100, 0) // Mock revenue calculation
  };

  return (
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
  );
};