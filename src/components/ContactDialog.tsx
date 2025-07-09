import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactDialogProps {
  trigger: React.ReactNode;
  type?: 'support' | 'sales' | 'general';
}

const ContactDialog = ({ trigger, type = 'general' }: ContactDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending the contact request
    console.log('Contact form submitted:', formData);
    
    toast({
      title: language === 'en' ? 'Message sent!' : 'Message envoyé !',
      description: language === 'en' 
        ? 'We will get back to you within 24 hours.' 
        : 'Nous vous répondrons dans les 24 heures.',
    });

    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    setOpen(false);
  };

  const getDialogTitle = () => {
    switch (type) {
      case 'support':
        return language === 'en' ? 'Contact Support' : 'Contacter le support';
      case 'sales':
        return language === 'en' ? 'Contact Sales Team' : 'Contacter l\'équipe commerciale';
      default:
        return language === 'en' ? 'Contact Us' : 'Nous contacter';
    }
  };

  const getDialogDescription = () => {
    switch (type) {
      case 'support':
        return language === 'en' 
          ? 'Need help with your subscription or technical issues? Our support team is here to help.'
          : 'Besoin d\'aide avec votre abonnement ou des problèmes techniques ? Notre équipe de support est là pour vous aider.';
      case 'sales':
        return language === 'en'
          ? 'Interested in our Enterprise plan? Let our sales team create a custom solution for you.'
          : 'Intéressé par notre plan Entreprise ? Laissez notre équipe commerciale créer une solution personnalisée pour vous.';
      default:
        return language === 'en'
          ? 'Get in touch with our team. We\'d love to hear from you.'
          : 'Contactez notre équipe. Nous serions ravis de vous entendre.';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-morphism">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === 'en' ? 'Full Name' : 'Nom complet'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === 'en' ? 'Your name' : 'Votre nom'}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'en' ? 'Email' : 'Email'} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={language === 'en' ? 'your@email.com' : 'votre@email.com'}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">
                {language === 'en' ? 'Hotel/Company' : 'Hôtel/Entreprise'}
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={language === 'en' ? 'Your hotel name' : 'Nom de votre hôtel'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone' : 'Téléphone'}
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={language === 'en' ? '+225 XX XX XX XX' : '+225 XX XX XX XX'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              {language === 'en' ? 'Subject' : 'Sujet'} *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={language === 'en' ? 'How can we help?' : 'Comment pouvons-nous vous aider ?'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">
              {language === 'en' ? 'Priority' : 'Priorité'}
            </Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  {language === 'en' ? 'Low' : 'Faible'}
                </SelectItem>
                <SelectItem value="medium">
                  {language === 'en' ? 'Medium' : 'Moyen'}
                </SelectItem>
                <SelectItem value="high">
                  {language === 'en' ? 'High' : 'Élevé'}
                </SelectItem>
                <SelectItem value="urgent">
                  {language === 'en' ? 'Urgent' : 'Urgent'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {language === 'en' ? 'Message' : 'Message'} *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={language === 'en' 
                ? 'Please describe your inquiry in detail...' 
                : 'Veuillez décrire votre demande en détail...'
              }
              rows={4}
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit" className="motion-blur">
              <Mail className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Send Message' : 'Envoyer le message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;