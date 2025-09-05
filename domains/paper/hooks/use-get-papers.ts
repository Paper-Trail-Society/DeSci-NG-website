import { $http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PaginatedPapersResponse } from "../types";
import { paperKeys } from "@/lib/react-query/query-keys";

const useGetPapers = ({
  search,
  userId,
  isEnabled = true,
}: {
  search?: string;
  userId?: string;
  isEnabled?: boolean;
}) => {
  return useQuery({
    queryKey: paperKeys.list(search ?? "", userId ?? ""),
    queryFn: async () => {
      const res = await $http.get<PaginatedPapersResponse>("/papers", {
        params: { search, userId },
      });
      return res.data;
    },
    enabled: isEnabled,
  });
};

export default useGetPapers;
