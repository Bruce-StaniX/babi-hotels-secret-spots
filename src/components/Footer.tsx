
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-ivorian rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold">Hotro de Babi</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Votre plateforme de confiance pour des réservations d'hébergements discrets 
              partout en Côte d'Ivoire. Confidentialité et confort garantis.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-ivorian-orange transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-ivorian-orange transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-ivorian-orange transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Réservation d'hôtels</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motels discrets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chambres privées</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service 24/7</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-ivorian-orange" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-ivorian-orange" />
                <span>+225 07 XX XX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-ivorian-orange" />
                <span>contact@hotrodebabi.ci</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 Hotro de Babi. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
