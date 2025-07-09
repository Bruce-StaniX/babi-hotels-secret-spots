
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Menu, Search, Heart, User, MessageCircle, MapPin, Settings, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';
import ModeSelector from './ModeSelector';
import { useAppMode } from '@/hooks/useAppMode';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, language, setMode, setLanguage, isPrivacyModeActive } = useAppMode();

  const menuItems = [
    { icon: Search, label: 'Recherche', labelEn: 'Search', href: '/search' },
    { icon: Heart, label: 'Favoris', labelEn: 'Favorites', href: '/favorites' },
    { icon: MessageCircle, label: 'Messages', labelEn: 'Messages', href: '/messages' },
    { icon: MapPin, label: 'Carte', labelEn: 'Map', href: '/map' },
    { icon: User, label: 'Profil', labelEn: 'Profile', href: '/profile' },
  ];

  const adminMenuItems = [
    { icon: Settings, label: 'Espace Hôtelier', labelEn: 'Hotel Space', href: '/hotel-space' },
    { icon: CreditCard, label: 'Abonnements', labelEn: 'Subscriptions', href: '/subscriptions' },
    { icon: Shield, label: 'Admin', labelEn: 'Admin', href: '/admin' },
  ];

  const getLabel = (item: any) => language === 'en' ? item.labelEn : item.label;

  return (
    <>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 glass-morphism border-b border-border/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png" 
                  alt="Hotro de Babi Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Hotro de Babi</h1>
                {isPrivacyModeActive && (
                  <Badge variant="destructive" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Mode Privé
                  </Badge>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <LanguageSwitch 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="w-5 h-5" />
                    {mode !== 'normal' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 glass-morphism p-0">
                  <ScrollArea className="h-full">
                    <div className="space-y-6 p-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Menu' : 'Menu'}</h3>
                        <div className="space-y-2">
                          {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Button
                                key={item.href}
                                variant="ghost"
                                className="w-full justify-start motion-blur"
                                asChild
                              >
                                <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                                  <IconComponent className="w-4 h-4 mr-3" />
                                  {getLabel(item)}
                                </Link>
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <ModeSelector currentMode={mode} onModeChange={setMode} />
                      </div>

                      <div className="border-t border-border pt-6">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                          {language === 'en' ? 'Management' : 'Gestion'}
                        </h4>
                        <div className="space-y-2">
                          {adminMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Button
                                key={item.href}
                                variant="ghost"
                                className="w-full justify-start motion-blur"
                                asChild
                              >
                                <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                                  <IconComponent className="w-4 h-4 mr-3" />
                                  {getLabel(item)}
                                </Link>
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          {language === 'en' ? 'Settings' : 'Paramètres'}
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-morphism border-t border-border/20">
        <div className="flex items-center justify-around py-2">
          {menuItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className="flex-col h-12 px-2 motion-blur"
                asChild
              >
                <Link to={item.href}>
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-xs">{getLabel(item)}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
