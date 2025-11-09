import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
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

  // Mock users for demonstration
  // const mockUsers: User[] = [
  //   {
  //     id: '1',
  //     email: 'patient@demo.com',
  //     role: 'patient',
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     phone: '+1234567890',
  //     created_at: new Date().toISOString(),
  //   },
  //   {
  //     id: '2',
  //     email: 'doctor@demo.com',
  //     role: 'doctor',
  //     first_name: 'Dr. Sarah',
  //     last_name: 'Johnson',
  //     phone: '+1234567891',
  //     created_at: new Date().toISOString(),
  //   },
  //   {
  //     id: '3',
  //     email: 'staff@demo.com',
  //     role: 'staff',
  //     first_name: 'Mike',
  //     last_name: 'Wilson',
  //     phone: '+1234567892',
  //     created_at: new Date().toISOString(),
  //   },
  //   {
  //     id: '4',
  //     email: 'admin@demo.com',
  //     role: 'admin',
  //     first_name: 'Admin',
  //     last_name: 'User',
  //     phone: '+1234567893',
  //     created_at: new Date().toISOString(),
  //   },
  // ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);


  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const data = response.data;
      localStorage.setItem("healthcare_user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  };

const signup = async (userData: any) => {
  setLoading(true);
  try {
    // ✅ Call backend API
    const response = await api.post("/auth/register", userData);

    // ✅ Get backend response (user + token)
    const data = response.data;

    // ✅ Save user + token to localStorage
    localStorage.setItem("healthcare_user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    // ✅ Update app state
    setUser(data);
  } catch (error: any) {
    console.error("Registration failed:", error);
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};