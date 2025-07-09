import { useState } from 'react';
import { Check, CreditCard, Star, Crown, Building2, ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ContactDialog from '@/components/ContactDialog';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'freemium',
      name: language === 'en' ? 'Freemium' : 'Freemium',
      description: language === 'en' ? 'Perfect for small hotels getting started' : 'Parfait pour les petits hôtels qui démarrent',
      price: 0,
      currency: 'FCFA',
      period: language === 'en' ? 'Forever' : 'Pour toujours',
      icon: Building2,
      features: [
        language === 'en' ? 'Up to 10 rooms' : 'Jusqu\'à 10 chambres',
        language === 'en' ? 'Basic booking management' : 'Gestion de réservation de base',
        language === 'en' ? 'Standard listing' : 'Référencement standard',
        language === 'en' ? 'Email support' : 'Support par email',
        language === 'en' ? 'Basic analytics' : 'Analyses de base'
      ],
      limitations: [
        language === 'en' ? 'Limited to 50 bookings/month' : 'Limité à 50 réservations/mois',
        language === 'en' ? 'Standard visibility' : 'Visibilité standard'
      ],
      buttonText: language === 'en' ? 'Get Started' : 'Commencer',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      id: 'premium',
      name: language === 'en' ? 'Premium' : 'Premium',
      description: language === 'en' ? 'Best for growing hotels with 11+ rooms' : 'Idéal pour les hôtels en croissance avec 11+ chambres',
      price: 25000,
      currency: 'FCFA',
      period: language === 'en' ? '/month' : '/mois',
      icon: Star,
      features: [
        language === 'en' ? 'Unlimited rooms (11+)' : 'Chambres illimitées (11+)',
        language === 'en' ? 'Advanced booking system' : 'Système de réservation avancé',
        language === 'en' ? 'Priority listing' : 'Référencement prioritaire',
        language === 'en' ? 'Priority support' : 'Support prioritaire',
        language === 'en' ? 'Advanced analytics & reports' : 'Analyses et rapports avancés',
        language === 'en' ? 'Revenue management tools' : 'Outils de gestion des revenus',
        language === 'en' ? 'Marketing tools' : 'Outils marketing'
      ],
      limitations: [],
      buttonText: language === 'en' ? 'Upgrade Now' : 'Mettre à niveau',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      id: 'enterprise',
      name: language === 'en' ? 'Enterprise' : 'Entreprise',
      description: language === 'en' ? 'Custom solution for hotel chains' : 'Solution personnalisée pour les chaînes hôtelières',
      price: null,
      currency: '',
      period: language === 'en' ? 'Custom pricing' : 'Tarif personnalisé',
      icon: Crown,
      features: [
        language === 'en' ? 'Multi-property management' : 'Gestion multi-propriétés',
        language === 'en' ? 'API access' : 'Accès API',
        language === 'en' ? 'Custom integrations' : 'Intégrations personnalisées',
        language === 'en' ? 'Dedicated account manager' : 'Gestionnaire de compte dédié',
        language === 'en' ? 'Custom analytics dashboard' : 'Tableau de bord analytique personnalisé',
        language === 'en' ? 'White-label solution' : 'Solution white-label',
        language === 'en' ? '24/7 phone support' : 'Support téléphonique 24/7'
      ],
      limitations: [],
      buttonText: language === 'en' ? 'Contact Sales' : 'Contacter les ventes',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    switch (planId) {
      case 'freemium':
        // Redirect to hotel space registration
        toast({
          title: language === 'en' ? 'Welcome to Freemium!' : 'Bienvenue dans Freemium !',
          description: language === 'en' 
            ? 'Create your hotel profile to get started.' 
            : 'Créez votre profil hôtelier pour commencer.',
        });
        navigate('/hotel-space');
        break;
        
      case 'premium':
        // TODO: Integrate with Stripe for Premium subscription
        toast({
          title: language === 'en' ? 'Premium Subscription' : 'Abonnement Premium',
          description: language === 'en' 
            ? 'Stripe integration coming soon. Contact us for early access.' 
            : 'Intégration Stripe bientôt disponible. Contactez-nous pour un accès anticipé.',
        });
        console.log('Premium subscription - Stripe integration needed');
        break;
        
      case 'enterprise':
        // This will be handled by the Contact Sales dialog
        break;
        
      default:
        console.log(`Unknown plan: ${planId}`);
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Go to homepage
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="motion-blur"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back' : 'Retour'}
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Hotel Subscription Plans' : 'Plans d\'abonnement hôteliers'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Choose the perfect plan for your hotel. Scale your business with our comprehensive booking and management solutions.'
              : 'Choisissez le plan parfait pour votre hôtel. Développez votre entreprise avec nos solutions complètes de réservation et de gestion.'
            }
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="glass-morphism rounded-lg p-1 flex">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
              className="rounded-md"
            >
              {language === 'en' ? 'Monthly' : 'Mensuel'}
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
              className="rounded-md"
            >
              {language === 'en' ? 'Yearly' : 'Annuel'}
              <Badge variant="secondary" className="ml-2 text-xs">
                {language === 'en' ? 'Save 20%' : 'Économisez 20%'}
              </Badge>
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const yearlyPrice = plan.price ? Math.floor(plan.price * 12 * 0.8) : null;
            const displayPrice = billingCycle === 'yearly' && yearlyPrice ? yearlyPrice : plan.price;
            const displayPeriod = billingCycle === 'yearly' && plan.price ? 
              (language === 'en' ? '/year' : '/an') : plan.period;

            return (
              <Card 
                key={plan.id} 
                className={`relative motion-blur ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      {language === 'en' ? 'Most Popular' : 'Plus populaire'}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    {displayPrice !== null ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">
                          {displayPrice.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {plan.currency}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">
                        {language === 'en' ? 'Contact us' : 'Nous contacter'}
                      </span>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{displayPeriod}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      {language === 'en' ? 'Features included:' : 'Fonctionnalités incluses :'}
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold text-muted-foreground mb-3 text-sm">
                        {language === 'en' ? 'Limitations:' : 'Limitations :'}
                      </h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-xs text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  {plan.id === 'enterprise' ? (
                    <ContactDialog
                      type="sales"
                      trigger={
                        <Button
                          className="w-full motion-blur"
                          variant={plan.buttonVariant}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          {plan.buttonText}
                        </Button>
                      }
                    />
                  ) : (
                    <Button
                      className="w-full motion-blur"
                      variant={plan.buttonVariant}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {plan.id === 'freemium' ? (
                        <UserPlus className="w-4 h-4 mr-2" />
                      ) : (
                        <CreditCard className="w-4 h-4 mr-2" />
                      )}
                      {plan.buttonText}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Questions?' : 'Des questions ?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'en' 
              ? 'Need help choosing the right plan? Our team is here to help.'
              : 'Besoin d\'aide pour choisir le bon plan ? Notre équipe est là pour vous aider.'
            }
          </p>
          <ContactDialog
            type="support"
            trigger={
              <Button variant="outline" className="motion-blur">
                {language === 'en' ? 'Contact Support' : 'Contacter le support'}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;