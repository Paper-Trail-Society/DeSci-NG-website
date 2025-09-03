import { $http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { Category, Field } from "../types";

const useGetFieldCategories = ({ fieldId }: { fieldId: number }) => {
  return useQuery({
    queryKey: ["field", fieldId, "categories"],
    queryFn: async () => {
      const res = await $http.get<Category[]>(`/fields/${fieldId}/categories`);
      return res.data;
    },
    enabled: typeof fieldId === "number" && fieldId > 0,
  });
};

export default useGetFieldCategories;
