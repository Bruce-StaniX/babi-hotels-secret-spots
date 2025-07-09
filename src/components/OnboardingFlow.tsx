
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Users, Eye } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState<string>('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const steps = [
    {
      icon: MapPin,
      title: "Localisation",
      titleNouchi: "Wé tu yé?",
      description: "Nous allons détecter votre commune pour vous proposer les meilleurs hébergements près de vous.",
      descriptionNouchi: "On va check ton quartier pour te montrer les bons spots."
    },
    {
      icon: Shield,
      title: "Connexion Sécurisée",
      titleNouchi: "Connection sûr",
      description: "Vous pouvez vous connecter de manière anonyme ou créer un compte sécurisé.",
      descriptionNouchi: "Tu peux te co en modo fantôme ou créer ton compte bien."
    },
    {
      icon: Users,
      title: "Mode Couple",
      titleNouchi: "Mode Couple",
      description: "Activez le mode couple pour des recommandations encore plus discrètes et privées.",
      descriptionNouchi: "Active le mode couple pour des spots encore plus discrets."
    }
  ];

  useEffect(() => {
    if (currentStep === 0) {
      handleLocationDetection();
    }
  }, [currentStep]);

  const handleLocationDetection = async () => {
    setIsLocationLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Simulate commune detection
            const communes = ['Cocody', 'Plateau', 'Adjamé', 'Yopougon', 'Marcory', 'Treichville'];
            const randomCommune = communes[Math.floor(Math.random() * communes.length)];
            setLocation(randomCommune);
            setIsLocationLoading(false);
          },
          () => {
            setLocation('Abidjan');
            setIsLocationLoading(false);
          }
        );
      } else {
        setLocation('Abidjan');
        setIsLocationLoading(false);
      }
    } catch (error) {
      setLocation('Abidjan');
      setIsLocationLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-morphism animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center animate-float">
            <img 
              src="/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png" 
              alt="Hotro de Babi Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {currentStepData.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground font-medium">
            {currentStepData.titleNouchi}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-foreground/80">
            {currentStepData.description}
          </p>
          <p className="text-center text-sm text-secondary/80 italic">
            {currentStepData.descriptionNouchi}
          </p>

          {currentStep === 0 && (
            <div className="text-center">
              {isLocationLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
                </div>
              ) : (
                <div className="bg-secondary/20 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <p className="text-secondary font-semibold">{location}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              onClick={handleNext}
              className="bg-primary text-primary-foreground hover:bg-primary/90 motion-blur"
              disabled={currentStep === 0 && isLocationLoading}
            >
              {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
