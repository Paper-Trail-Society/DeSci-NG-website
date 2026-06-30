import { $http } from "@/lib/http";
import { institutionKeys } from "@/lib/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";

interface Institution {
  id: number;
  name: string;
}

interface InstitutionsResponse {
  status: "success";
  institutions: Institution[];
}

export default function useGetInstitutions() {
  return useQuery({
    queryKey: institutionKeys.all,
    queryFn: async (): Promise<Institution[]> => {
      const response = await $http.get<InstitutionsResponse>("/institutions");
      return response.data.institutions;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - institutions don't change often
  });
}

export type { Institution };
