import { useMutation } from "@tanstack/react-query";

import { $http } from "@/lib/http";

import {
  CreateProjectShowcaseSubmissionResponse,
  ProjectShowcaseSubmissionPayload,
} from "../types";

export default function useCreateProjectShowcaseSubmission() {
  return useMutation({
    mutationFn: async (payload: ProjectShowcaseSubmissionPayload) => {
      const response = await $http.post<CreateProjectShowcaseSubmissionResponse>(
        "/project-showcase-submissions",
        payload,
      );

      return response.data;
    },
  });
}
