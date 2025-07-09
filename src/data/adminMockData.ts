export const users = [
  {
    id: 1,
    name: 'Kouamé Jean',
    email: 'kouame.jean@email.com',
    role: 'hotel_manager',
    status: 'active',
    lastLogin: '2024-01-10'
  },
  {
    id: 2,
    name: 'Marie Diallo',
    email: 'marie.diallo@email.com',
    role: 'customer',
    status: 'active',
    lastLogin: '2024-01-09'
  },
  {
    id: 3,
    name: 'Pierre Yao',
    email: 'pierre.yao@email.com',
    role: 'hotel_manager',
    status: 'pending',
    lastLogin: '2024-01-08'
  }
];

export const hotelRequests = [
  {
    id: 1,
    hotelName: 'Grand Hotel Bassam',
    ownerName: 'Ibrahim Touré',
    location: 'Grand-Bassam, Côte d\'Ivoire',
    status: 'pending',
    submittedDate: '2024-01-08',
    documents: 3
  },
  {
    id: 2,
    hotelName: 'Resort de Man',
    ownerName: 'Fatou Kone',
    location: 'Man, Côte d\'Ivoire',
    status: 'approved',
    submittedDate: '2024-01-05',
    documents: 5
  }
];

export const systemStats = {
  totalUsers: 1247,
  totalHotels: 89,
  totalBookings: 3456,
  monthlyRevenue: '15,230,000 FCFA',
  systemHealth: 98.5,
  activeIssues: 2
};