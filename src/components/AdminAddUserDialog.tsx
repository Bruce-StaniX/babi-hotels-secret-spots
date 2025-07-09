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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { UserPlus } from 'lucide-react';

interface AdminAddUserDialogProps {
  children: React.ReactNode;
}

const AdminAddUserDialog = ({ children }: AdminAddUserDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.role || !formData.password) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' 
          ? 'Please fill in all required fields.' 
          : 'Veuillez remplir tous les champs requis.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: language === 'en' ? 'User Added' : 'Utilisateur Ajouté',
      description: language === 'en' 
        ? `User ${formData.name} has been added successfully.` 
        : `L'utilisateur ${formData.name} a été ajouté avec succès.`,
    });
    
    setFormData({ name: '', email: '', role: '', password: '' });
    setIsOpen(false);
  };

  const getRoleOptions = () => [
    { value: 'customer', label: language === 'en' ? 'Customer' : 'Client' },
    { value: 'hotel_manager', label: language === 'en' ? 'Hotel Manager' : 'Gestionnaire d\'Hôtel' },
    { value: 'admin', label: language === 'en' ? 'Administrator' : 'Administrateur' },
    { value: 'support', label: language === 'en' ? 'Support' : 'Support' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {language === 'en' ? 'Add New User' : 'Ajouter Nouvel Utilisateur'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Create a new user account for the platform.' 
              : 'Créer un nouveau compte utilisateur pour la plateforme.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user-name">
              {language === 'en' ? 'Full Name' : 'Nom Complet'} *
            </Label>
            <Input 
              id="user-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder={language === 'en' ? 'Enter full name' : 'Entrer le nom complet'}
              required
            />
          </div>

          <div>
            <Label htmlFor="user-email">
              {language === 'en' ? 'Email Address' : 'Adresse Email'} *
            </Label>
            <Input 
              id="user-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder={language === 'en' ? 'Enter email address' : 'Entrer l\'adresse email'}
              required
            />
          </div>

          <div>
            <Label htmlFor="user-role">
              {language === 'en' ? 'User Role' : 'Rôle Utilisateur'} *
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select role' : 'Sélectionner un rôle'} />
              </SelectTrigger>
              <SelectContent>
                {getRoleOptions().map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="user-password">
              {language === 'en' ? 'Temporary Password' : 'Mot de Passe Temporaire'} *
            </Label>
            <Input 
              id="user-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder={language === 'en' ? 'Enter temporary password' : 'Entrer un mot de passe temporaire'}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit">
              {language === 'en' ? 'Add User' : 'Ajouter Utilisateur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddUserDialog;