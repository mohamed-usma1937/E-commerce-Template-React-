import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import usersData from '@/data/users.json';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'customer';
  avatar: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orders: Array<{
    id: string;
    date: string;
    status: string;
    total: number;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = usersData.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword as User,
            isAuthenticated: true,
          });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      register: async (userData) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = usersData.find(u => u.email === userData.email);
        if (existingUser) {
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          role: 'customer',
          avatar: '/api/placeholder/100/100',
          phone: userData.phone || '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
          orders: [],
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
        });
        
        return true;
      },
      
      updateProfile: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);