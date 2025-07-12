export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  images: string[];
  category: string;
  size: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  tags: string[];
  points: number;
  status: 'available' | 'pending' | 'swapped';
  createdAt: string;
}

export interface Swap {
  id: string;
  requesterId: string;
  receiverId: string;
  itemId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  message?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  type: 'earned' | 'spent';
  createdAt: string;
}