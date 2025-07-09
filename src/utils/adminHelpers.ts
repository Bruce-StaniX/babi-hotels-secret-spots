export const getRoleText = (role: string, language: string) => {
  const roleMap: { [key: string]: { fr: string; en: string } } = {
    admin: { fr: 'Administrateur', en: 'Administrator' },
    hotel_manager: { fr: 'Gestionnaire d\'Hôtel', en: 'Hotel Manager' },
    customer: { fr: 'Client', en: 'Customer' },
    support: { fr: 'Support', en: 'Support' }
  };
  return language === 'en' ? roleMap[role]?.en || role : roleMap[role]?.fr || role;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'suspended':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: string, language: string) => {
  const statusMap: { [key: string]: { fr: string; en: string } } = {
    active: { fr: 'Actif', en: 'Active' },
    inactive: { fr: 'Inactif', en: 'Inactive' },
    pending: { fr: 'En attente', en: 'Pending' },
    approved: { fr: 'Approuvé', en: 'Approved' },
    rejected: { fr: 'Rejeté', en: 'Rejected' },
    suspended: { fr: 'Suspendu', en: 'Suspended' }
  };
  return language === 'en' ? statusMap[status]?.en || status : statusMap[status]?.fr || status;
};