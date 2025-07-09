import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Settings } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';

export const HotelSpaceQuickActions = () => {
  const { language } = useAppMode();

  return (
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
  );
};