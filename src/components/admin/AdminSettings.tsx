import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppMode } from '@/hooks/useAppMode';

const AdminSettings = () => {
  const { language } = useAppMode();

  return (
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
  );
};

export default AdminSettings;