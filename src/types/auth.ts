export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  balance: number;
  cryptoWallet?: string;
  joinDate: string;
  hasCompletedSetup: boolean;
  isActive: boolean;
  isProfileSetup?: boolean;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  walletType?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  gender?: string;
  withdrawalAddresses?: {
    tether?: string;
    solana?: string;
    trx?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface InvestmentPackage {
  _id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  duration: number;
  roi: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  _id: string;
  userId: User | string;
  packageId: InvestmentPackage | string;
  amount: number;
  startDate: string;
  endDate: string;
  currentValue: number;
  dailyReturn: number;
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  method: 'crypto' | 'paypal';
  date: string;
  adminNotes?: string;
}