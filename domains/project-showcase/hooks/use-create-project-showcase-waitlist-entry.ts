import { useMutation } from "@tanstack/react-query";

import { $http } from "@/lib/http";

import {
  CreateProjectShowcaseWaitlistResponse,
  ProjectShowcaseWaitlistPayload,
} from "../types";

export default function useCreateProjectShowcaseWaitlistEntry() {
  return useMutation({
    mutationFn: async (payload: ProjectShowcaseWaitlistPayload) => {
      const response = await $http.post<CreateProjectShowcaseWaitlistResponse>(
        "/project-showcase-waitlist",
        payload,
      );

      return response.data;
    },
  });
}
