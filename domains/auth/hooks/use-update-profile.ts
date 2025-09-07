import { $http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

interface UpdateProfileData {
  institutionId?: number;
  areasOfInterest?: string[];
}

interface UpdateProfileResponse {
  status: "success";
  message: string;
}

interface UseUpdateProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUpdateProfile(options?: UseUpdateProfileOptions) {
  return useMutation({
    mutationFn: async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
      const response = await $http.put<UpdateProfileResponse>("/profile", data);
      return response.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
