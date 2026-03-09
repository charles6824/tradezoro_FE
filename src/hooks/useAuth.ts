import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';

const STORAGE_KEY = 'crypto_auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.user && parsed.token) {
          setAuthState({ user: parsed.user, isAuthenticated: true });
        }
      } catch (error) {
        console.error('Error parsing auth state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (user: User, token?: string) => {
    const newState = { user, isAuthenticated: true };
    setAuthState(newState);
    
    // Update localStorage if token is provided
    if (token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        token,
        user
      }));
    }
  };

  const logout = () => {
    const newState = { user: null, isAuthenticated: false };
    setAuthState(newState);
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/';
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      const newState = { ...authState, user: updatedUser };
      setAuthState(newState);
      
      // Update localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.user = updatedUser;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } catch (error) {
          console.error('Error updating stored auth state:', error);
        }
      }
    }
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
};