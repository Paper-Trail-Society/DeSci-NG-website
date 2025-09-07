"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  // Clean up Bearer token when session ends
  useEffect(() => {
    if (!session?.user && typeof window !== "undefined") {
      localStorage.removeItem("bearer_token");
    }
  }, [session?.user]);

  const logout = async () => {
    try {
      await authClient.signOut();
      if (typeof window !== "undefined") {
        localStorage.removeItem("bearer_token");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Force cleanup even if signOut fails
      if (typeof window !== "undefined") {
        localStorage.removeItem("bearer_token");
      }
    }
  };

  const authValue: AuthContextType = {
    user: session?.user || null,
    session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
