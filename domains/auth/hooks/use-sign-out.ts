import { useAuthContext } from "@/lib/contexts/auth-context";
import { useMutation } from "@tanstack/react-query";

interface UseSignOutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useSignOut(options?: UseSignOutOptions) {
  const { logout } = useAuthContext();

  return useMutation({
    mutationFn: async () => {
      await logout();
      // Context handles Bearer token cleanup
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
