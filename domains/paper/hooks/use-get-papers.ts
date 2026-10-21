import { $http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedPapersResponse } from "../types";
import { paperKeys } from "@/lib/react-query/query-keys";

const useGetPapers = ({
  search,
  userId,
  fieldId,
  categoryId,
  page,
  isEnabled = true,
}: {
  search?: string;
  userId?: string;
  fieldId?: string;
  categoryId?: string;
  page?: number;
  isEnabled?: boolean;
}) => {
  return useQuery({
    queryKey: paperKeys.list(
      search ?? "",
      userId ?? "",
      page?.toString() ?? "1",
      fieldId ?? "",
      categoryId ?? "",
    ),
    queryFn: async () => {
      const res = await $http.get<PaginatedPapersResponse>("/papers", {
        params: { search, userId, page, fieldId, categoryId },
      });
      return res.data;
    },
    enabled: isEnabled,
    staleTime: 60 * 1000, // 1 minute
  });
};

export default useGetPapers;
