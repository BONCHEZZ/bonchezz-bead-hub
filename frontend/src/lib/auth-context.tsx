import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getProfile,
} from "@/lib/api";

type User = {
  id: number;
  full_name: string;
  student_email: string;
  phone_number: string;
  date_joined: string;
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    full_name: string;
    student_email: string;
    phone_number: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bonchezz-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("bonchezz-token", data.access);
    localStorage.setItem("bonchezz-refresh", data.refresh);
    const profile = await getProfile();
    localStorage.setItem("bonchezz-user", JSON.stringify(profile));
    setUser(profile);
  };

  const register = async (payload: {
    full_name: string;
    student_email: string;
    phone_number: string;
    password: string;
  }) => {
    const profile = await apiRegister(payload);
    const data = await apiLogin(payload.student_email, payload.password);
    localStorage.setItem("bonchezz-token", data.access);
    localStorage.setItem("bonchezz-refresh", data.refresh);
    localStorage.setItem("bonchezz-user", JSON.stringify(profile));
    setUser(profile);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // ignore logout errors
    }
    localStorage.removeItem("bonchezz-token");
    localStorage.removeItem("bonchezz-refresh");
    localStorage.removeItem("bonchezz-user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
