import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { paperCommentKeys } from "@/lib/react-query/query-keys";

interface UpdateCommentPayload {
  paperId: number;
  commentId: number;
  body: string;
  parentCommentId?: number | null;
}

const useUpdatePaperComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paperId, commentId, body }: UpdateCommentPayload) => {
      const { data } = await $http.put(
        `/papers/${paperId}/comments/${commentId}`,
        { body },
      );
      return data;
    },
    onSuccess: (_data, variables) => {
      const { paperId, parentCommentId } = variables as UpdateCommentPayload;

      // Invalidate all comment lists for this paper (any sort direction)
      queryClient.invalidateQueries({
        queryKey: paperCommentKeys.root(paperId),
      });

      // Also invalidate replies for this thread if applicable
      if (parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: paperCommentKeys.replies(paperId, parentCommentId, "asc"),
        });
      }
    },
  });
};

export default useUpdatePaperComment;
