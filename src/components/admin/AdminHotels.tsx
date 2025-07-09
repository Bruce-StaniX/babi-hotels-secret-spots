import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/hooks/useAppMode';
import AdminHotelActionDialog from '@/components/AdminHotelActionDialog';
import { hotelRequests } from '@/data/adminMockData';
import { getStatusColor, getStatusText } from '@/utils/adminHelpers';

const AdminHotels = () => {
  const { language } = useAppMode();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {language === 'en' ? 'Hotel Approval Requests' : 'Demandes d\'Approbation d\'Hôtels'}
        </h2>
      </div>

      <div className="space-y-4">
        {hotelRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">{request.hotelName}</h3>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusText(request.status, language)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Owner:' : 'Propriétaire:'} {request.ownerName}
                  </p>
                  <p className="text-sm text-muted-foreground">{request.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Submitted:' : 'Soumis:'} {request.submittedDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">
                    {request.documents} {language === 'en' ? 'documents' : 'documents'}
                  </p>
                  <div className="flex gap-2">
                    <AdminHotelActionDialog request={request} action="view">
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'View Details' : 'Voir Détails'}
                      </Button>
                    </AdminHotelActionDialog>
                    {request.status === 'pending' && (
                      <>
                        <AdminHotelActionDialog request={request} action="approve">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            {language === 'en' ? 'Approve' : 'Approuver'}
                          </Button>
                        </AdminHotelActionDialog>
                        <AdminHotelActionDialog request={request} action="reject">
                          <Button variant="outline" size="sm" className="text-destructive border-destructive">
                            {language === 'en' ? 'Reject' : 'Rejeter'}
                          </Button>
                        </AdminHotelActionDialog>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHotels;