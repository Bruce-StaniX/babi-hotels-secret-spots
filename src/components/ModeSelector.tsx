
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, EyeOff, Shield } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: 'normal' | 'couple' | 'private';
  onModeChange: (mode: 'normal' | 'couple' | 'private') => void;
}

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes = [
    {
      id: 'normal',
      icon: Shield,
      title: 'Mode Normal',
      titleNouchi: 'Mode Normal',
      description: 'Navigation standard avec toutes les fonctionnalités',
      descriptionNouchi: 'Navigation classique avec tout',
      color: 'bg-card border-border'
    },
    {
      id: 'couple',
      icon: Users,
      title: 'Mode Couple Discret',
      titleNouchi: 'Mode Couple Discret',
      description: 'Recommandations privées spécialement sélectionnées',
      descriptionNouchi: 'Spots privés spécialement choisis',
      color: 'discrete-indicator'
    },
    {
      id: 'private',
      icon: EyeOff,
      title: 'Mode Privé',
      titleNouchi: 'Mode Privé',
      description: 'Historique effacé + captures d\'écran bloquées',
      descriptionNouchi: 'Historique clean + screenshots bloqués',
      color: 'bg-destructive/10 border-destructive/30'
    }
  ] as const;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Choisir votre mode</h3>
        <p className="text-sm text-muted-foreground">Choisir ton mode</p>
      </div>

      <div className="grid gap-3">
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <Card 
              key={mode.id}
              className={`${mode.color} cursor-pointer transition-all motion-blur ${
                isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:ring-1 hover:ring-primary/50'
              }`}
              onClick={() => onModeChange(mode.id as 'normal' | 'couple' | 'private')}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground">{mode.title}</h4>
                      {isActive && (
                        <Badge variant="default" className="text-xs">
                          Actif
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-secondary/80 font-medium mb-1">
                      {mode.titleNouchi}
                    </p>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                    <p className="text-xs text-muted-foreground/80 italic mt-1">
                      {mode.descriptionNouchi}
                    </p>
                  </div>
                </div>
                
                {mode.id === 'private' && isActive && (
                  <div className="mt-3 pt-3 border-t border-destructive/20">
                    <div className="flex items-center space-x-2 text-xs text-destructive">
                      <Eye className="w-3 h-3" />
                      <span>Mode privé activé - Historique protégé</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
