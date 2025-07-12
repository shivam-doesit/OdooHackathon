import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('rewear_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock authentication - in real app, this would call your API
    const mockUser: User = {
      id: '1',
      name: email === 'admin@rewear.com' ? 'Admin User' : 'John Doe',
      email,
      points: 150,
      role: email === 'admin@rewear.com' ? 'admin' : 'user',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('rewear_user', JSON.stringify(mockUser));
      setLoading(false);
    }, 1000);

    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      points: 50, // Welcome bonus
      role: 'user',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('rewear_user', JSON.stringify(mockUser));
      setLoading(false);
    }, 1000);

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rewear_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};