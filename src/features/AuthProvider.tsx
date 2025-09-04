// src/features/auth/AuthProvider.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from './auth/authSlice';

interface UserData {
  id: string;
  email: string;
  username: string;
}

interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get<UserData>('http://localhost:3001/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUser(userData);
        dispatch(
          loginSuccess({
            token,
            email: userData.email,
            username: userData.username,
            id: userData.id,
          })
        );
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
