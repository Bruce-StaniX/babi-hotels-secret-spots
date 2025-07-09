
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';

interface LanguageSwitchProps {
  currentLanguage: 'fr' | 'en';
  onLanguageChange: (language: 'fr' | 'en') => void;
}

const LanguageSwitch = ({ currentLanguage, onLanguageChange }: LanguageSwitchProps) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ] as const;

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32 h-8 text-xs">
          <SelectValue>
            <div className="flex items-center">
              <span className="mr-1">{getCurrentLanguage()?.flag}</span>
              {getCurrentLanguage()?.name}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center">
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitch;
