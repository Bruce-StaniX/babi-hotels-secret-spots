import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hotel } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';

interface HotelSpaceSignInProps {
  email: string;
  setEmail: (email: string) => void;
  signingIn: boolean;
  onSignIn: (e?: React.FormEvent) => void;
}

export const HotelSpaceSignIn = ({ email, setEmail, signingIn, onSignIn }: HotelSpaceSignInProps) => {
  const { language } = useAppMode();

  return (
    <Card className="max-w-md mx-auto mt-12">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Hotel className="w-6 h-6" />
          {language === 'en' ? 'Sign In Required' : 'Connexion Requise'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          {language === 'en' 
            ? 'Please sign in to access your hotel management dashboard' 
            : 'Veuillez vous connecter pour accéder à votre tableau de bord hôtelier'}
        </p>
        <form onSubmit={onSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'en' ? 'Email Address' : 'Adresse Email'}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={language === 'en' ? 'Enter your email' : 'Saisissez votre email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={signingIn}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={signingIn}>
            {signingIn 
              ? (language === 'en' ? 'Sending...' : 'Envoi...') 
              : (language === 'en' ? 'Sign In with Email' : 'Se connecter par Email')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};