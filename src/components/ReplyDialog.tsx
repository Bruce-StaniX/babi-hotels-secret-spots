import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Reply } from 'lucide-react';

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalMessage: string;
  senderName: string;
}

export const ReplyDialog = ({ open, onOpenChange, originalMessage, senderName }: ReplyDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reply.trim()) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Please enter a reply message' : 'Veuillez entrer un message de réponse',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: language === 'en' ? 'Reply Sent' : 'Réponse Envoyée',
      description: language === 'en' 
        ? `Your reply to ${senderName} has been sent successfully` 
        : `Votre réponse à ${senderName} a été envoyée avec succès`
    });

    setReply('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Reply className="w-5 h-5" />
            {language === 'en' ? 'Reply to Message' : 'Répondre au Message'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? `Replying to ${senderName}` 
              : `Réponse à ${senderName}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Original Message */}
          <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Original Message:' : 'Message Original:'}
              </span>
            </div>
            <p className="text-sm">{originalMessage}</p>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reply">
                {language === 'en' ? 'Your Reply' : 'Votre Réponse'} *
              </Label>
              <Textarea
                id="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={language === 'en' ? 'Type your reply here...' : 'Tapez votre réponse ici...'}
                rows={5}
                className="resize-none"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {language === 'en' ? 'Cancel' : 'Annuler'}
              </Button>
              <Button type="submit">
                {language === 'en' ? 'Send Reply' : 'Envoyer Réponse'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};