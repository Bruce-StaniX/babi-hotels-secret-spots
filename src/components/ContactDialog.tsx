import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestName: string;
  reservationId?: number;
}

export const ContactDialog = ({ open, onOpenChange, guestName, reservationId }: ContactDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [contactMethod, setContactMethod] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactMethod || !message) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Please fill in all fields' : 'Veuillez remplir tous les champs',
        variant: 'destructive'
      });
      return;
    }

    const methodText = contactMethod === 'email' ? 'email' : 
                      contactMethod === 'phone' ? (language === 'en' ? 'phone' : 'téléphone') : 
                      (language === 'en' ? 'message' : 'message');

    toast({
      title: language === 'en' ? 'Contact Sent' : 'Contact Envoyé',
      description: language === 'en' 
        ? `Your ${methodText} to ${guestName} has been sent successfully` 
        : `Votre ${methodText} à ${guestName} a été envoyé avec succès`
    });

    setContactMethod('');
    setMessage('');
    setSubject('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {language === 'en' ? 'Contact Guest' : 'Contacter le Client'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? `Send a message to ${guestName}` 
              : `Envoyer un message à ${guestName}`}
            {reservationId && ` (${language === 'en' ? 'Reservation' : 'Réservation'} #${reservationId})`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>
              {language === 'en' ? 'Contact Method' : 'Méthode de Contact'} *
            </Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select contact method' : 'Sélectionnez la méthode'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {language === 'en' ? 'Email' : 'Email'}
                  </div>
                </SelectItem>
                <SelectItem value="phone">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {language === 'en' ? 'Phone Call' : 'Appel Téléphonique'}
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {language === 'en' ? 'SMS' : 'SMS'}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contactMethod === 'email' && (
            <div>
              <Label htmlFor="subject">
                {language === 'en' ? 'Subject' : 'Sujet'} *
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={language === 'en' ? 'Enter email subject' : 'Entrez le sujet de l\'email'}
              />
            </div>
          )}

          <div>
            <Label htmlFor="message">
              {language === 'en' ? 'Message' : 'Message'} *
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'en' ? 'Enter your message' : 'Entrez votre message'}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit">
              {language === 'en' ? 'Send' : 'Envoyer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};