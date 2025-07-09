import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageSquare, User, Send } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { Hotel } from '@/data/hotelsData';
import { useToast } from '@/hooks/use-toast';

interface ContactHotelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export const ContactHotelDialog = ({ open, onOpenChange, hotel }: ContactHotelDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'inquiry'
  });

  if (!hotel) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.message) {
        throw new Error(language === 'en' ? 'Please fill in all required fields' : 'Veuillez remplir tous les champs obligatoires');
      }

      // Simulate sending message
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: language === 'en' ? "Message Sent!" : "Message Envoyé !",
        description: language === 'en' 
          ? `Your message has been sent to ${hotel.name}. They will contact you shortly.`
          : `Votre message a été envoyé au ${hotel.name}. Ils vous contacteront sous peu.`,
      });

      onOpenChange(false);
      
      // Reset form
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: 'inquiry'
      });

    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "Erreur",
        description: error instanceof Error ? error.message : (language === 'en' ? "An error occurred" : "Une erreur est survenue"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactReasons = [
    { value: 'inquiry', label: language === 'en' ? 'General Inquiry' : 'Demande Générale' },
    { value: 'booking', label: language === 'en' ? 'Booking Question' : 'Question de Réservation' },
    { value: 'amenities', label: language === 'en' ? 'Amenities & Services' : 'Équipements & Services' },
    { value: 'accessibility', label: language === 'en' ? 'Accessibility' : 'Accessibilité' },
    { value: 'group', label: language === 'en' ? 'Group Booking' : 'Réservation de Groupe' },
    { value: 'events', label: language === 'en' ? 'Events & Meetings' : 'Événements & Réunions' },
    { value: 'other', label: language === 'en' ? 'Other' : 'Autre' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {language === 'en' ? 'Contact Hotel' : 'Contacter l\'Hôtel'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? `Send a message to ${hotel.name}` : `Envoyez un message au ${hotel.name}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informations de contact */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              {language === 'en' ? 'Your Information' : 'Vos Informations'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{language === 'en' ? 'First Name *' : 'Prénom *'}</Label>
                <Input
                  id="firstName"
                  value={contactData.firstName}
                  onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{language === 'en' ? 'Last Name *' : 'Nom *'}</Label>
                <Input
                  id="lastName"
                  value={contactData.lastName}
                  onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {language === 'en' ? 'Email *' : 'Email *'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
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
                  value={contactData.phone}
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Motif du contact */}
          <div className="space-y-2">
            <Label>{language === 'en' ? 'Reason for Contact' : 'Motif du Contact'}</Label>
            <Select value={contactData.contactReason} onValueChange={(value) => setContactData({...contactData, contactReason: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contactReasons.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sujet */}
          <div className="space-y-2">
            <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'Sujet'}</Label>
            <Input
              id="subject"
              value={contactData.subject}
              onChange={(e) => setContactData({...contactData, subject: e.target.value})}
              placeholder={language === 'en' ? 'Brief subject of your message' : 'Sujet bref de votre message'}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{language === 'en' ? 'Message *' : 'Message *'}</Label>
            <Textarea
              id="message"
              value={contactData.message}
              onChange={(e) => setContactData({...contactData, message: e.target.value})}
              placeholder={language === 'en' ? 'Please describe your inquiry or question...' : 'Veuillez décrire votre demande ou question...'}
              rows={5}
              required
            />
          </div>

          {/* Informations de l'hôtel */}
          <div className="p-3 bg-muted/50 rounded-lg text-sm">
            <h4 className="font-medium mb-1">{hotel.name}</h4>
            <p className="text-muted-foreground">{hotel.location}</p>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Rating' : 'Note'}: {hotel.rating}/5 • {hotel.reviews} {language === 'en' ? 'reviews' : 'avis'}
            </p>
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
                language === 'en' ? 'Sending...' : 'Envoi...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Send Message' : 'Envoyer Message'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};