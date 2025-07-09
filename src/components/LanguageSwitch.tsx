
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages } from 'lucide-react';

interface LanguageSwitchProps {
  currentLanguage: 'fr';
  onLanguageChange: (language: 'fr') => void;
}

const LanguageSwitch = ({ currentLanguage, onLanguageChange }: LanguageSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          variant="default"
          size="sm"
          className="text-xs px-3 py-1 h-7 bg-primary text-primary-foreground"
          disabled
        >
          <span className="mr-1">🇫🇷</span>
          Français
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitch;
