"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextValue = {
  username: string | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  username,
  children,
}: {
  username: string | null;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      username,
      isAuthenticated: username !== null,
      isLoggingOut,
      logout,
    }),
    [username, isLoggingOut, logout]
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
