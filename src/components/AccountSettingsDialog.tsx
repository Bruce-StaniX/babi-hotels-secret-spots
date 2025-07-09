import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';

interface AccountSettingsDialogProps {
  children: React.ReactNode;
  userEmail?: string;
}

export const AccountSettingsDialog = ({ children, userEmail }: AccountSettingsDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Passwords do not match' : 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Password must be at least 6 characters' : 'Le mot de passe doit contenir au moins 6 caractères',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' ? 'Password updated successfully' : 'Mot de passe mis à jour avec succès',
      });
      
      setNewPassword('');
      setConfirmPassword('');
      setOpen(false);
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: error.message || (language === 'en' ? 'Failed to update password' : 'Impossible de mettre à jour le mot de passe'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Account Settings' : 'Paramètres du Compte'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'en' ? 'Email Address' : 'Adresse Email'}</Label>
            <Input value={userEmail || ''} disabled />
          </div>
          
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">
                {language === 'en' ? 'New Password' : 'Nouveau Mot de Passe'}
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={language === 'en' ? 'Enter new password' : 'Saisissez le nouveau mot de passe'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                {language === 'en' ? 'Confirm Password' : 'Confirmer le Mot de Passe'}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={language === 'en' ? 'Confirm new password' : 'Confirmez le nouveau mot de passe'}
              />
            </div>
            
            <Button type="submit" disabled={loading || !newPassword || !confirmPassword}>
              {loading 
                ? (language === 'en' ? 'Updating...' : 'Mise à jour...') 
                : (language === 'en' ? 'Update Password' : 'Mettre à Jour le Mot de Passe')
              }
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};