import { useQuery } from "@tanstack/react-query";

import { $http } from "@/lib/http";
import { fieldKeys } from "@/lib/react-query/query-keys";

import { Field } from "../types";

const useGetFields = () => {
  return useQuery({
    queryKey: fieldKeys.all,
    queryFn: async () => {
      const res = await $http.get<Field[]>("/fields");
      return res.data;
    },
  });
};

export default useGetFields;
