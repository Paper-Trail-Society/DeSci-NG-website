import { $http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

const useDeletePaper = () => {
  return useMutation({
    mutationFn: async (paperId: number | string) => {
      const response = await $http.delete<{ message: string }>(
        `/papers/${paperId}`
      );
      return response.data;
    },
  });
};

export default useDeletePaper;
