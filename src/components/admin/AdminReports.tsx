import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppMode } from '@/hooks/useAppMode';
import { systemStats } from '@/data/adminMockData';

const AdminReports = () => {
  const { language } = useAppMode();

  return (
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
  );
};

export default AdminReports;