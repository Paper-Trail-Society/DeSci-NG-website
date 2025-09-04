import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";

interface UseVerifyEmailOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useVerifyEmail(options?: UseVerifyEmailOptions) {
  return useMutation({
    mutationFn: async (token: string) => {
      const result = await authClient.verifyEmail({
        query: { token },
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      return result.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
