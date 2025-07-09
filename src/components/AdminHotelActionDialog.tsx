import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';
import { Eye, CheckCircle, XCircle, FileText } from 'lucide-react';

interface HotelRequest {
  id: number;
  hotelName: string;
  ownerName: string;
  location: string;
  status: string;
  submittedDate: string;
  documents: number;
}

interface AdminHotelActionDialogProps {
  request: HotelRequest;
  action: 'view' | 'approve' | 'reject';
  children: React.ReactNode;
}

const AdminHotelActionDialog = ({ request, action, children }: AdminHotelActionDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const getDialogConfig = () => {
    switch (action) {
      case 'view':
        return {
          title: language === 'en' ? 'Hotel Request Details' : 'Détails de la Demande d\'Hôtel',
          description: language === 'en' ? 'View complete hotel registration request information.' : 'Voir les informations complètes de la demande d\'inscription d\'hôtel.',
          icon: <Eye className="w-5 h-5" />
        };
      case 'approve':
        return {
          title: language === 'en' ? 'Approve Hotel Request' : 'Approuver la Demande d\'Hôtel',
          description: language === 'en' ? 'Approve this hotel registration request.' : 'Approuver cette demande d\'inscription d\'hôtel.',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        };
      case 'reject':
        return {
          title: language === 'en' ? 'Reject Hotel Request' : 'Rejeter la Demande d\'Hôtel',
          description: language === 'en' ? 'Reject this hotel registration request with a reason.' : 'Rejeter cette demande d\'inscription d\'hôtel avec une raison.',
          icon: <XCircle className="w-5 h-5 text-red-600" />
        };
    }
  };

  const handleAction = () => {
    switch (action) {
      case 'approve':
        toast({
          title: language === 'en' ? 'Hotel Approved' : 'Hôtel Approuvé',
          description: language === 'en' 
            ? `${request.hotelName} has been approved successfully.` 
            : `${request.hotelName} a été approuvé avec succès.`,
        });
        break;
      case 'reject':
        if (!rejectionReason.trim()) {
          toast({
            title: language === 'en' ? 'Error' : 'Erreur',
            description: language === 'en' 
              ? 'Please provide a reason for rejection.' 
              : 'Veuillez fournir une raison pour le rejet.',
            variant: 'destructive',
          });
          return;
        }
        toast({
          title: language === 'en' ? 'Hotel Rejected' : 'Hôtel Rejeté',
          description: language === 'en' 
            ? `${request.hotelName} has been rejected.` 
            : `${request.hotelName} a été rejeté.`,
        });
        break;
    }
    setIsOpen(false);
  };

  const config = getDialogConfig();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { fr: string; en: string } } = {
      pending: { fr: 'En attente', en: 'Pending' },
      approved: { fr: 'Approuvé', en: 'Approved' },
      rejected: { fr: 'Rejeté', en: 'Rejected' }
    };
    return language === 'en' ? statusMap[status]?.en || status : statusMap[status]?.fr || status;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{request.hotelName}</h3>
              <Badge className={getStatusColor(request.status)}>
                {getStatusText(request.status)}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">
                  {language === 'en' ? 'Owner:' : 'Propriétaire:'} 
                </span>
                <span className="ml-2">{request.ownerName}</span>
              </div>
              <div>
                <span className="font-medium">
                  {language === 'en' ? 'Location:' : 'Emplacement:'} 
                </span>
                <span className="ml-2">{request.location}</span>
              </div>
              <div>
                <span className="font-medium">
                  {language === 'en' ? 'Submitted:' : 'Soumis:'} 
                </span>
                <span className="ml-2">{request.submittedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{request.documents} {language === 'en' ? 'documents submitted' : 'documents soumis'}</span>
              </div>
            </div>
          </div>

          {action === 'view' && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  {language === 'en' ? 'Business License' : 'Licence Commerciale'}
                </Label>
                <p className="text-sm text-muted-foreground">✓ {language === 'en' ? 'Verified' : 'Vérifié'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  {language === 'en' ? 'Property Documents' : 'Documents de Propriété'}
                </Label>
                <p className="text-sm text-muted-foreground">✓ {language === 'en' ? 'Verified' : 'Vérifié'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  {language === 'en' ? 'Insurance Certificate' : 'Certificat d\'Assurance'}
                </Label>
                <p className="text-sm text-muted-foreground">✓ {language === 'en' ? 'Verified' : 'Vérifié'}</p>
              </div>
            </div>
          )}

          {action === 'approve' && (
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                {language === 'en' 
                  ? 'Approving this request will activate the hotel on the platform and send a confirmation email to the owner.' 
                  : 'L\'approbation de cette demande activera l\'hôtel sur la plateforme et enverra un email de confirmation au propriétaire.'}
              </p>
            </div>
          )}

          {action === 'reject' && (
            <div className="space-y-3">
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  {language === 'en' 
                    ? 'Rejecting this request will permanently decline the application. Please provide a clear reason.' 
                    : 'Rejeter cette demande refusera définitivement la candidature. Veuillez fournir une raison claire.'}
                </p>
              </div>
              <div>
                <Label htmlFor="rejection-reason">
                  {language === 'en' ? 'Reason for Rejection' : 'Raison du Rejet'} *
                </Label>
                <Textarea 
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder={language === 'en' 
                    ? 'Please explain why this request is being rejected...' 
                    : 'Veuillez expliquer pourquoi cette demande est rejetée...'}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            {action !== 'view' && (
              <Button 
                onClick={handleAction}
                variant={action === 'approve' ? 'default' : 'destructive'}
              >
                {action === 'approve' 
                  ? (language === 'en' ? 'Approve Hotel' : 'Approuver l\'Hôtel')
                  : (language === 'en' ? 'Reject Hotel' : 'Rejeter l\'Hôtel')
                }
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminHotelActionDialog;