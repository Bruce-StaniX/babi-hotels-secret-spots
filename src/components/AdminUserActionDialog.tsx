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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { Eye, Edit, Trash2, User } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface AdminUserActionDialogProps {
  user: User;
  action: 'view' | 'edit' | 'delete';
  children: React.ReactNode;
}

const AdminUserActionDialog = ({ user, action, children }: AdminUserActionDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  });

  const getDialogConfig = () => {
    switch (action) {
      case 'view':
        return {
          title: language === 'en' ? 'User Details' : 'Détails Utilisateur',
          description: language === 'en' ? 'View user information and activity.' : 'Voir les informations et l\'activité de l\'utilisateur.',
          icon: <Eye className="w-5 h-5" />
        };
      case 'edit':
        return {
          title: language === 'en' ? 'Edit User' : 'Modifier Utilisateur',
          description: language === 'en' ? 'Update user information and settings.' : 'Mettre à jour les informations et paramètres de l\'utilisateur.',
          icon: <Edit className="w-5 h-5" />
        };
      case 'delete':
        return {
          title: language === 'en' ? 'Delete User' : 'Supprimer Utilisateur',
          description: language === 'en' ? 'Permanently remove this user from the system.' : 'Supprimer définitivement cet utilisateur du système.',
          icon: <Trash2 className="w-5 h-5" />
        };
    }
  };

  const handleAction = () => {
    switch (action) {
      case 'edit':
        toast({
          title: language === 'en' ? 'User Updated' : 'Utilisateur Mis à Jour',
          description: language === 'en' 
            ? `User ${editData.name} has been updated successfully.` 
            : `L'utilisateur ${editData.name} a été mis à jour avec succès.`,
        });
        break;
      case 'delete':
        toast({
          title: language === 'en' ? 'User Deleted' : 'Utilisateur Supprimé',
          description: language === 'en' 
            ? `User ${user.name} has been deleted successfully.` 
            : `L'utilisateur ${user.name} a été supprimé avec succès.`,
        });
        break;
    }
    setIsOpen(false);
  };

  const config = getDialogConfig();

  const getRoleOptions = () => [
    { value: 'customer', label: language === 'en' ? 'Customer' : 'Client' },
    { value: 'hotel_manager', label: language === 'en' ? 'Hotel Manager' : 'Gestionnaire d\'Hôtel' },
    { value: 'admin', label: language === 'en' ? 'Administrator' : 'Administrateur' },
    { value: 'support', label: language === 'en' ? 'Support' : 'Support' }
  ];

  const getStatusOptions = () => [
    { value: 'active', label: language === 'en' ? 'Active' : 'Actif' },
    { value: 'inactive', label: language === 'en' ? 'Inactive' : 'Inactif' },
    { value: 'suspended', label: language === 'en' ? 'Suspended' : 'Suspendu' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {action === 'view' && (
            <div className="space-y-3">
              <div>
                <Label>{language === 'en' ? 'Role' : 'Rôle'}</Label>
                <p className="text-sm">{user.role}</p>
              </div>
              <div>
                <Label>{language === 'en' ? 'Status' : 'Statut'}</Label>
                <Badge className="ml-2">{user.status}</Badge>
              </div>
              <div>
                <Label>{language === 'en' ? 'Last Login' : 'Dernière Connexion'}</Label>
                <p className="text-sm">{user.lastLogin}</p>
              </div>
            </div>
          )}

          {action === 'edit' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">{language === 'en' ? 'Name' : 'Nom'}</Label>
                <Input 
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">{language === 'en' ? 'Email' : 'Email'}</Label>
                <Input 
                  id="edit-email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                />
              </div>
              <div>
                <Label>{language === 'en' ? 'Role' : 'Rôle'}</Label>
                <Select value={editData.role} onValueChange={(value) => setEditData({...editData, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Label>{language === 'en' ? 'Status' : 'Statut'}</Label>
                <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatusOptions().map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {action === 'delete' && (
            <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
              <p className="text-sm">
                {language === 'en' 
                  ? 'This action cannot be undone. This will permanently delete the user account and remove all associated data.' 
                  : 'Cette action ne peut pas être annulée. Cela supprimera définitivement le compte utilisateur et toutes les données associées.'}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            {action !== 'view' && (
              <Button 
                onClick={handleAction}
                variant={action === 'delete' ? 'destructive' : 'default'}
              >
                {action === 'edit' 
                  ? (language === 'en' ? 'Save Changes' : 'Sauvegarder')
                  : (language === 'en' ? 'Delete User' : 'Supprimer')
                }
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUserActionDialog;