import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { ResendVerificationFormData } from "../schemas";

interface UseResendVerificationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useResendVerification(options?: UseResendVerificationOptions) {
  return useMutation({
    mutationFn: async (data: ResendVerificationFormData) => {
      const result = await authClient.sendVerificationEmail({
        email: data.email,
        callbackURL: `${window.location.origin}/verify-email`,
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
