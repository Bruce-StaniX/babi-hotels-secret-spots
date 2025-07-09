import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { Settings } from 'lucide-react';

interface AdminSystemSettingsDialogProps {
  children: React.ReactNode;
}

const AdminSystemSettingsDialog = ({ children }: AdminSystemSettingsDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    platformName: 'Hotro de Babi',
    maintenanceMode: false,
    allowRegistrations: true,
    maxFileSize: '10',
    backupFrequency: 'daily'
  });

  const handleSave = () => {
    toast({
      title: language === 'en' ? 'Settings Saved' : 'Paramètres Sauvegardés',
      description: language === 'en' 
        ? 'System settings have been updated successfully.' 
        : 'Les paramètres système ont été mis à jour avec succès.',
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {language === 'en' ? 'System Settings' : 'Paramètres Système'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Configure system-wide settings and preferences.' 
              : 'Configurer les paramètres et préférences du système.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform-name">
                {language === 'en' ? 'Platform Name' : 'Nom de la Plateforme'}
              </Label>
              <Input 
                id="platform-name" 
                value={settings.platformName}
                onChange={(e) => setSettings({...settings, platformName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="max-file-size">
                {language === 'en' ? 'Max File Size (MB)' : 'Taille Max Fichier (MB)'}
              </Label>
              <Input 
                id="max-file-size" 
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{language === 'en' ? 'Maintenance Mode' : 'Mode Maintenance'}</Label>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Temporarily disable the platform for maintenance' 
                    : 'Désactiver temporairement la plateforme pour maintenance'}
                </p>
              </div>
              <Switch 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{language === 'en' ? 'Allow New Registrations' : 'Autoriser Nouvelles Inscriptions'}</Label>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Allow new users to register on the platform' 
                    : 'Permettre aux nouveaux utilisateurs de s\'inscrire'}
                </p>
              </div>
              <Switch 
                checked={settings.allowRegistrations}
                onCheckedChange={(checked) => setSettings({...settings, allowRegistrations: checked})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button onClick={handleSave}>
              {language === 'en' ? 'Save Changes' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSystemSettingsDialog;