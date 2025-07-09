
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages } from 'lucide-react';

interface LanguageSwitchProps {
  currentLanguage: 'fr' | 'en';
  onLanguageChange: (language: 'fr' | 'en') => void;
}

const LanguageSwitch = ({ currentLanguage, onLanguageChange }: LanguageSwitchProps) => {
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <div className="flex bg-muted rounded-lg p-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? 'default' : 'ghost'}
            size="sm"
            className={`text-xs px-3 py-1 h-7 ${
              currentLanguage === lang.code 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onLanguageChange(lang.code)}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
