
import { Button } from "@/components/ui/button";
import { Home, Search, Heart, User, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-ivorian rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Hotro de Babi</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-600 hover:text-ivorian-orange">
                Accueil
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-ivorian-orange">
                Hébergements
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-ivorian-orange">
                Favoris
              </Button>
              <Button className="gradient-ivorian text-white">
                Se connecter
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start text-gray-600">
                  Accueil
                </Button>
                <Button variant="ghost" className="justify-start text-gray-600">
                  Hébergements
                </Button>
                <Button variant="ghost" className="justify-start text-gray-600">
                  Favoris
                </Button>
                <Button className="gradient-ivorian text-white">
                  Se connecter
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
            <Home className="h-5 w-5 text-ivorian-orange" />
            <span className="text-xs text-ivorian-orange mt-1">Accueil</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
            <Search className="h-5 w-5 text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Recherche</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
            <Heart className="h-5 w-5 text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Favoris</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">Profil</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
