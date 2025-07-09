import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';
import { Crown, Users, TrendingUp, DollarSign, Calendar, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Subscription = Tables<'subscriptions'>;

const AdminSubscriptions = () => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to fetch subscriptions' : 'Impossible de charger les abonnements',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status })
        .eq('id', subscriptionId);

      if (error) throw error;

      await fetchSubscriptions();
      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' 
          ? `Subscription ${status} successfully` 
          : `Abonnement ${status === 'active' ? 'activé' : status === 'suspended' ? 'suspendu' : 'mis à jour'} avec succès`,
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to update subscription' : 'Impossible de mettre à jour l\'abonnement',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      suspended: 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: language === 'en' ? 'Active' : 'Actif',
      expired: language === 'en' ? 'Expired' : 'Expiré',
      cancelled: language === 'en' ? 'Cancelled' : 'Annulé',
      suspended: language === 'en' ? 'Suspended' : 'Suspendu'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPlanColor = (planType: string) => {
    const colors = {
      freemium: 'bg-gray-100 text-gray-800',
      premium: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return colors[planType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPlanText = (planType: string) => {
    const texts = {
      freemium: 'Freemium',
      premium: 'Premium',
      enterprise: 'Enterprise'
    };
    return texts[planType as keyof typeof texts] || planType;
  };

  const isExpiring = (subscription: Subscription) => {
    if (!subscription.end_date) return false;
    const endDate = new Date(subscription.end_date);
    const now = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  };

  const isExpired = (subscription: Subscription) => {
    if (!subscription.end_date) return false;
    const endDate = new Date(subscription.end_date);
    const now = new Date();
    return endDate < now;
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return subscription.status === 'active';
    if (activeTab === 'expired') return subscription.status === 'expired' || isExpired(subscription);
    if (activeTab === 'expiring') return isExpiring(subscription);
    return true;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired' || isExpired(s)).length,
    expiring: subscriptions.filter(s => isExpiring(s)).length,
    premium: subscriptions.filter(s => s.plan_type === 'premium').length,
    enterprise: subscriptions.filter(s => s.plan_type === 'enterprise').length
  };

  if (loading) {
    return <div className="text-center py-8">{language === 'en' ? 'Loading subscriptions...' : 'Chargement des abonnements...'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {language === 'en' ? 'Subscription Management' : 'Gestion des Abonnements'}
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Total Subscriptions' : 'Total Abonnements'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Active' : 'Actifs'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.expiring}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Expiring Soon' : 'Expirent Bientôt'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.premium + stats.enterprise}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Premium Users' : 'Utilisateurs Premium'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            {language === 'en' ? 'All' : 'Tous'} ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="active">
            {language === 'en' ? 'Active' : 'Actifs'} ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="expiring">
            {language === 'en' ? 'Expiring' : 'Expirent'} ({stats.expiring})
          </TabsTrigger>
          <TabsTrigger value="expired">
            {language === 'en' ? 'Expired' : 'Expirés'} ({stats.expired})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className={isExpiring(subscription) ? 'border-orange-200 bg-orange-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">User {subscription.user_id?.slice(0, 8)}...</h3>
                      <Badge className={getPlanColor(subscription.plan_type)}>
                        {getPlanText(subscription.plan_type)}
                      </Badge>
                      <Badge className={getStatusColor(subscription.status)}>
                        {getStatusText(subscription.status)}
                      </Badge>
                      {isExpiring(subscription) && (
                        <Badge className="bg-orange-100 text-orange-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {language === 'en' ? 'Expiring Soon' : 'Expire Bientôt'}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {language === 'en' ? 'Start:' : 'Début:'} {new Date(subscription.start_date).toLocaleDateString()}
                        </p>
                        {subscription.end_date && (
                          <p>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {language === 'en' ? 'End:' : 'Fin:'} {new Date(subscription.end_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <p>
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          {language === 'en' ? 'Auto-renew:' : 'Renouvellement auto:'} {subscription.auto_renew ? '✅' : '❌'}
                        </p>
                        {subscription.stripe_subscription_id && (
                          <p className="text-xs font-mono">
                            Stripe: {subscription.stripe_subscription_id.slice(0, 20)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {subscription.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-orange-600 border-orange-600"
                        onClick={() => updateSubscriptionStatus(subscription.id, 'suspended')}
                      >
                        {language === 'en' ? 'Suspend' : 'Suspendre'}
                      </Button>
                    )}
                    {subscription.status === 'suspended' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateSubscriptionStatus(subscription.id, 'active')}
                      >
                        {language === 'en' ? 'Reactivate' : 'Réactiver'}
                      </Button>
                    )}
                    {subscription.status === 'expired' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateSubscriptionStatus(subscription.id, 'active')}
                      >
                        {language === 'en' ? 'Renew' : 'Renouveler'}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'Contact' : 'Contacter'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'en' ? 'No subscriptions found' : 'Aucun abonnement trouvé'}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSubscriptions;