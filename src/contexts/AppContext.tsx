import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item, Swap, Transaction } from '../types';

interface AppContextType {
  items: Item[];
  swaps: Swap[];
  transactions: Transaction[];
  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  createSwap: (itemId: string, message?: string) => void;
  updateSwap: (id: string, status: Swap['status']) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const mockItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in fall/winter. Minimal wear, all buttons intact.',
    ownerId: '2',
    ownerName: 'Sarah Chen',
    ownerAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    images: [
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2'
    ],
    category: 'Outerwear',
    size: 'M',
    condition: 'excellent',
    tags: ['vintage', 'denim', 'casual', 'unisex'],
    points: 25,
    status: 'available',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral print midi dress, perfect for summer events. Lightweight and breathable fabric.',
    ownerId: '3',
    ownerName: 'Emma Rodriguez',
    ownerAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2'
    ],
    category: 'Dresses',
    size: 'S',
    condition: 'good',
    tags: ['floral', 'summer', 'midi', 'feminine'],
    points: 20,
    status: 'available',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    title: 'Designer Wool Coat',
    description: 'Luxurious wool coat from a premium brand. Excellent for professional settings and cold weather.',
    ownerId: '4',
    ownerName: 'Michael Johnson',
    ownerAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2'
    ],
    category: 'Outerwear',
    size: 'L',
    condition: 'excellent',
    tags: ['wool', 'designer', 'professional', 'winter'],
    points: 45,
    status: 'available',
    createdAt: '2024-01-13T09:15:00Z'
  }
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addItem = (item: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const createSwap = (itemId: string, message?: string) => {
    const newSwap: Swap = {
      id: Date.now().toString(),
      requesterId: '1', // Current user
      receiverId: items.find(item => item.id === itemId)?.ownerId || '',
      itemId,
      status: 'pending',
      message,
      createdAt: new Date().toISOString()
    };
    setSwaps(prev => [newSwap, ...prev]);
  };

  const updateSwap = (id: string, status: Swap['status']) => {
    setSwaps(prev => prev.map(swap => 
      swap.id === id ? { ...swap, status } : swap
    ));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      items,
      swaps,
      transactions,
      addItem,
      updateItem,
      createSwap,
      updateSwap,
      addTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};