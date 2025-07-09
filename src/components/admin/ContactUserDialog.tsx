import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send } from 'lucide-react';

interface ContactUserDialogProps {
  children: React.ReactNode;
  userId: string;
  userEmail?: string;
  context?: 'subscription' | 'hotel' | 'general';
  contextId?: string;
}

const ContactUserDialog = ({ children, userId, userEmail, context = 'general', contextId }: ContactUserDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent'
  });

  const getSubjectSuggestions = () => {
    const suggestions = {
      subscription: {
        en: [
          'Subscription Renewal Reminder',
          'Payment Issue Resolution',
          'Account Status Update',
          'Subscription Benefits Information'
        ],
        fr: [
          'Rappel de Renouvellement d\'Abonnement',
          'Résolution de Problème de Paiement',
          'Mise à jour du Statut du Compte',
          'Informations sur les Avantages de l\'Abonnement'
        ]
      },
      hotel: {
        en: [
          'Hotel Listing Status Update',
          'Required Documentation',
          'Policy Compliance Notice',
          'Approval Process Information'
        ],
        fr: [
          'Mise à jour du Statut de l\'Hôtel',
          'Documentation Requise',
          'Avis de Conformité aux Politiques',
          'Informations sur le Processus d\'Approbation'
        ]
      },
      general: {
        en: [
          'Account Information',
          'Platform Update',
          'Support Request',
          'Important Notice'
        ],
        fr: [
          'Informations sur le Compte',
          'Mise à jour de la Plateforme',
          'Demande de Support',
          'Avis Important'
        ]
      }
    };

    return suggestions[context][language as 'en' | 'fr'] || suggestions.general.en;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-admin-email', {
        body: {
          targetUserId: userId,
          targetEmail: userEmail,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
          context,
          contextId
        }
      });

      if (error) throw error;

      toast({
        title: language === 'en' ? 'Message Sent' : 'Message Envoyé',
        description: language === 'en' 
          ? 'Your message has been sent to the user successfully.' 
          : 'Votre message a été envoyé à l\'utilisateur avec succès.',
      });

      setOpen(false);
      setFormData({
        subject: '',
        message: '',
        priority: 'normal'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' 
          ? 'Failed to send message. Please try again.' 
          : 'Impossible d\'envoyer le message. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-blue-600',
      normal: 'text-green-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    };
    return colors[priority as keyof typeof colors];
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      low: language === 'en' ? 'Low' : 'Faible',
      normal: language === 'en' ? 'Normal' : 'Normal',
      high: language === 'en' ? 'High' : 'Élevée',
      urgent: language === 'en' ? 'Urgent' : 'Urgent'
    };
    return texts[priority as keyof typeof texts];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {language === 'en' ? 'Contact User' : 'Contacter l\'Utilisateur'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Info */}
          <div className="bg-muted p-3 rounded">
            <div className="text-sm">
              <p><strong>{language === 'en' ? 'User ID:' : 'ID Utilisateur:'}</strong> {userId.slice(0, 8)}...</p>
              {userEmail && (
                <p><strong>{language === 'en' ? 'Email:' : 'Email:'}</strong> {userEmail}</p>
              )}
              <p><strong>{language === 'en' ? 'Context:' : 'Contexte:'}</strong> {context}</p>
            </div>
          </div>

          {/* Subject with suggestions */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              {language === 'en' ? 'Subject' : 'Sujet'} *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              placeholder={language === 'en' ? 'Enter email subject...' : 'Entrez le sujet de l\'email...'}
            />
            
            {/* Subject suggestions */}
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">{language === 'en' ? 'Suggestions:' : 'Suggestions:'}</p>
              <div className="flex flex-wrap gap-1">
                {getSubjectSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData({ ...formData, subject: suggestion })}
                    className="px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded text-xs transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">
              {language === 'en' ? 'Priority' : 'Priorité'}
            </Label>
            <Select value={formData.priority} onValueChange={(value) => 
              setFormData({ ...formData, priority: value as 'low' | 'normal' | 'high' | 'urgent' })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <span className={getPriorityColor('low')}>{getPriorityText('low')}</span>
                </SelectItem>
                <SelectItem value="normal">
                  <span className={getPriorityColor('normal')}>{getPriorityText('normal')}</span>
                </SelectItem>
                <SelectItem value="high">
                  <span className={getPriorityColor('high')}>{getPriorityText('high')}</span>
                </SelectItem>
                <SelectItem value="urgent">
                  <span className={getPriorityColor('urgent')}>{getPriorityText('urgent')}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {language === 'en' ? 'Message' : 'Message'} *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              placeholder={language === 'en' 
                ? 'Write your message to the user...' 
                : 'Rédigez votre message à l\'utilisateur...'}
            />
          </div>

          {/* Message templates */}
          {context === 'subscription' && (
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm font-medium mb-2">
                {language === 'en' ? 'Template for Subscription Issues:' : 'Modèle pour les Problèmes d\'Abonnement:'}
              </p>
              <button
                type="button"
                onClick={() => setFormData({ 
                  ...formData, 
                  message: language === 'en' 
                    ? `Dear User,\n\nWe noticed an issue with your subscription. Please contact our support team to resolve this matter.\n\nBest regards,\nAdmin Team`
                    : `Cher Utilisateur,\n\nNous avons remarqué un problème avec votre abonnement. Veuillez contacter notre équipe de support pour résoudre ce problème.\n\nCordialement,\nÉquipe Admin`
                })}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                {language === 'en' ? 'Use this template' : 'Utiliser ce modèle'}
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading} className="gradient-ivorian">
              <Send className="w-4 h-4 mr-2" />
              {loading 
                ? (language === 'en' ? 'Sending...' : 'Envoi...') 
                : (language === 'en' ? 'Send Message' : 'Envoyer le Message')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUserDialog;