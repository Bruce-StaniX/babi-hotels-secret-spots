import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Settings } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import AddHotelDialog from '@/components/admin/AddHotelDialog';
import { AccountSettingsDialog } from '@/components/AccountSettingsDialog';

interface HotelSpaceQuickActionsProps {
  onViewAnalytics: () => void;
  onHotelAdded: () => void;
  userEmail?: string;
}

export const HotelSpaceQuickActions = ({ onViewAnalytics, onHotelAdded, userEmail }: HotelSpaceQuickActionsProps) => {
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
          <AddHotelDialog onHotelAdded={onHotelAdded}>
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              {language === 'en' ? 'Add New Hotel' : 'Ajouter Hôtel'}
            </Button>
          </AddHotelDialog>
          <Button variant="outline" className="h-20 flex-col" onClick={onViewAnalytics}>
            <BarChart3 className="w-6 h-6 mb-2" />
            {language === 'en' ? 'View Analytics' : 'Voir Analyses'}
          </Button>
          <AccountSettingsDialog userEmail={userEmail}>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="w-6 h-6 mb-2" />
              {language === 'en' ? 'Account Settings' : 'Paramètres'}
            </Button>
          </AccountSettingsDialog>
        </div>
      </CardContent>
    </Card>
  );
};