import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { Settings, Globe, Palette, Shield } from 'lucide-react';

interface SettingsDialogProps {
  children: React.ReactNode;
}

export const SettingsDialog = ({ children }: SettingsDialogProps) => {
  const { mode, language, setMode, setLanguage, isPrivacyModeActive } = useAppMode();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
  };

  const handleModeChange = (newMode: 'normal' | 'couple' | 'private') => {
    setMode(newMode);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {language === 'en' ? 'Settings' : 'Paramètres'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Language Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <Label className="text-sm font-medium">
                {language === 'en' ? 'Language' : 'Langue'}
              </Label>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Mode Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <Label className="text-sm font-medium">
                {language === 'en' ? 'Application Mode' : 'Mode Application'}
              </Label>
            </div>
            <Select value={mode} onValueChange={handleModeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">
                  {language === 'en' ? 'Normal Mode' : 'Mode Normal'}
                </SelectItem>
                <SelectItem value="couple">
                  {language === 'en' ? 'Couple Mode' : 'Mode Couple'}
                </SelectItem>
                <SelectItem value="private">
                  {language === 'en' ? 'Private Mode' : 'Mode Privé'}
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Changes the available features and navigation options'
                : 'Modifie les fonctionnalités disponibles et les options de navigation'
              }
            </p>
          </div>

          <Separator />

          {/* Privacy Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <Label className="text-sm font-medium">
                {language === 'en' ? 'Privacy' : 'Confidentialité'}
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm">
                  {language === 'en' ? 'Privacy Mode' : 'Mode Privé'}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Enhanced privacy features for sensitive browsing'
                    : 'Fonctionnalités de confidentialité renforcées pour la navigation sensible'
                  }
                </p>
              </div>
              <Switch 
                checked={isPrivacyModeActive} 
                onCheckedChange={(checked) => {
                  // Privacy mode is already handled by the mode system
                  // This could be extended for additional privacy features
                }}
                disabled={mode !== 'normal'}
              />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Close' : 'Fermer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};