import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";

interface UseSignOutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useSignOut(options?: UseSignOutOptions) {
  return useMutation({
    mutationFn: async () => {
      try {
        await authClient.signOut();
      } catch (error) {
        console.error("Sign out error:", error);
        throw error;
      }
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
