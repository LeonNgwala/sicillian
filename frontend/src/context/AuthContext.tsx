"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type {
  User, AuthResponse, OrgRegisterResponse,
  LoginData, LearnerRegisterData, OrgRegisterData,
} from '@/types';

const ROLE_DASHBOARD: Record<string, string> = {
  Learner: '/learner/matches',
  Employer: '/employer/dashboard',
  Institution: '/institution/dashboard',
  SETA: '/seta/dashboard',
  Incubator: '/incubator/dashboard',
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  registerLearner: (data: LearnerRegisterData) => Promise<void>;
  registerOrg: (data: OrgRegisterData) => Promise<OrgRegisterResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function setCookies(token: string, role: string) {
  const maxAge = 60 * 60 * 24; // 1 day
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}`;
  document.cookie = `user_role=${role}; path=/; max-age=${maxAge}`;
}

function clearCookies() {
  document.cookie = 'auth_token=; path=/; max-age=0';
  document.cookie = 'user_role=; path=/; max-age=0';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function persist(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCookies(token, user.role);
    setToken(token);
    setUser(user);
  }

  async function login(data: LoginData) {
    const res = await api.post<AuthResponse>('/auth/login/', data);
    persist(res.token, res.user);
    if (res.user.account_status === 'pending') {
      router.push('/pending');
    } else {
      router.push(ROLE_DASHBOARD[res.user.role] ?? '/');
    }
  }

  async function registerLearner(data: LearnerRegisterData) {
    const res = await api.post<AuthResponse>('/auth/register/learner/', data);
    persist(res.token, res.user);
    router.push(ROLE_DASHBOARD['Learner']);
  }

  async function registerOrg(data: OrgRegisterData): Promise<OrgRegisterResponse> {
    const res = await api.post<OrgRegisterResponse>('/auth/register/organisation/', data);
    return res;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearCookies();
    setToken(null);
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, registerLearner, registerOrg, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
