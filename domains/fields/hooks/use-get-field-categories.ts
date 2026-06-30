import { $http } from "@/lib/http";
import { fieldKeys } from "@/lib/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../types";

const useGetFieldCategories = ({ fieldId }: { fieldId: number }) => {
  return useQuery({
    queryKey: fieldKeys.categories(fieldId),
    queryFn: async () => {
      const res = await $http.get<Category[]>(`/fields/${fieldId}/categories`);
      return res.data;
    },
    enabled: typeof fieldId === "number" && fieldId > 0,
  });
};

export default useGetFieldCategories;
