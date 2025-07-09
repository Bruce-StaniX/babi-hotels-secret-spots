import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Users } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import AdminUserActionDialog from '@/components/AdminUserActionDialog';
import { users } from '@/data/adminMockData';
import { getRoleText, getStatusColor, getStatusText } from '@/utils/adminHelpers';

const AdminUsers = () => {
  const { language } = useAppMode();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {language === 'en' ? 'User Management' : 'Gestion des Utilisateurs'}
        </h2>
        <div className="flex gap-2">
          <Input 
            placeholder={language === 'en' ? 'Search users...' : 'Rechercher des utilisateurs...'}
            className="w-64"
          />
          <Button variant="outline">
            {language === 'en' ? 'Filter' : 'Filtrer'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{getRoleText(user.role, language)}</Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {getStatusText(user.status, language)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Last login:' : 'Dernière connexion:'} {user.lastLogin}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <AdminUserActionDialog user={user} action="view">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'View' : 'Voir'}
                      </Button>
                    </AdminUserActionDialog>
                    <AdminUserActionDialog user={user} action="edit">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Edit' : 'Modifier'}
                      </Button>
                    </AdminUserActionDialog>
                    <AdminUserActionDialog user={user} action="delete">
                      <Button variant="outline" size="sm" className="text-destructive border-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AdminUserActionDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;