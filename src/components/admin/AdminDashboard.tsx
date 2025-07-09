import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Building } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';

const AdminDashboard = () => {
  const { language } = useAppMode();

  return (
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
  );
};

export default AdminDashboard;