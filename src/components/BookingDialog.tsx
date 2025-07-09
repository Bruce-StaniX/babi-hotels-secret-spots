import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, CreditCard, Phone, Mail, User, Clock } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { Hotel } from '@/data/hotelsData';
import { useToast } from '@/hooks/use-toast';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export const BookingDialog = ({ open, onOpenChange, hotel }: BookingDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  if (!hotel) return null;

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const rooms = parseInt(bookingData.rooms) || 1;
    return nights * hotel.price * rooms;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!bookingData.checkIn || !bookingData.checkOut) {
        throw new Error(language === 'en' ? 'Please select check-in and check-out dates' : 'Veuillez sélectionner les dates d\'arrivée et de départ');
      }

      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email) {
        throw new Error(language === 'en' ? 'Please fill in all required fields' : 'Veuillez remplir tous les champs obligatoires');
      }

      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: language === 'en' ? "Booking Confirmed!" : "Réservation Confirmée !",
        description: language === 'en' 
          ? `Your reservation at ${hotel.name} has been confirmed. You will receive a confirmation email shortly.`
          : `Votre réservation au ${hotel.name} a été confirmée. Vous recevrez un email de confirmation sous peu.`,
      });

      onOpenChange(false);
      
      // Reset form
      setBookingData({
        checkIn: '',
        checkOut: '',
        guests: '2',
        rooms: '1',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
      });

    } catch (error) {
      toast({
        title: language === 'en' ? "Booking Error" : "Erreur de Réservation",
        description: error instanceof Error ? error.message : (language === 'en' ? "An error occurred" : "Une erreur est survenue"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {language === 'en' ? 'Book Your Stay' : 'Réserver Votre Séjour'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? `Complete your reservation at ${hotel.name}` : `Complétez votre réservation au ${hotel.name}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates et Occupants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {language === 'en' ? 'Check-in Date' : 'Date d\'Arrivée'}
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                min={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {language === 'en' ? 'Check-out Date' : 'Date de Départ'}
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                min={bookingData.checkIn || today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {language === 'en' ? 'Guests' : 'Personnes'}
              </Label>
              <Select value={bookingData.guests} onValueChange={(value) => setBookingData({...bookingData, guests: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {language === 'en' ? (num === 1 ? 'guest' : 'guests') : (num === 1 ? 'personne' : 'personnes')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'en' ? 'Rooms' : 'Chambres'}
              </Label>
              <Select value={bookingData.rooms} onValueChange={(value) => setBookingData({...bookingData, rooms: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {language === 'en' ? (num === 1 ? 'room' : 'rooms') : (num === 1 ? 'chambre' : 'chambres')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Résumé de la réservation */}
          {nights > 0 && (
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Booking Summary' : 'Résumé de la Réservation'}
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Nights' : 'Nuits'}:</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Price per night' : 'Prix par nuit'}:</span>
                  <span>{hotel.price.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Rooms' : 'Chambres'}:</span>
                  <span>{bookingData.rooms}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>{language === 'en' ? 'Total' : 'Total'}:</span>
                    <span>{total.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              {language === 'en' ? 'Guest Information' : 'Informations du Client'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{language === 'en' ? 'First Name *' : 'Prénom *'}</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{language === 'en' ? 'Last Name *' : 'Nom *'}</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {language === 'en' ? 'Email *' : 'Email *'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {language === 'en' ? 'Phone' : 'Téléphone'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">
                {language === 'en' ? 'Special Requests' : 'Demandes Spéciales'}
              </Label>
              <Textarea
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                placeholder={language === 'en' ? 'Any special requests or preferences...' : 'Demandes spéciales ou préférences...'}
                rows={3}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 gradient-ivorian"
            >
              {loading ? (
                language === 'en' ? 'Processing...' : 'Traitement...'
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Confirm Booking' : 'Confirmer la Réservation'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};