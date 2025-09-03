import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { data: session, isPending, error } = authClient.useSession();

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.data;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const result = await authClient.signUp.email({ email, password, name });
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.data;
  };

  const resetPassword = async (email: string) => {
    const result = await authClient.forgetPassword({ email });
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.data;
  };

  return {
    user: session?.user || null,
    session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
