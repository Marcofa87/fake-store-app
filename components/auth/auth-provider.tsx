"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthState = {
  token: string | null;
  username: string | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ token: null, username: null });

  const login = useCallback((token: string, username: string) => {
    setState({ token, username });
  }, []);

  const logout = useCallback(() => {
    setState({ token: null, username: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: state.token !== null,
      login,
      logout,
    }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve essere usato dentro <AuthProvider>");
  }

  return context;
}
