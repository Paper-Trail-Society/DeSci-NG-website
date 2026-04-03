import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { paperCommentKeys } from "@/lib/react-query/query-keys";

interface DeleteCommentPayload {
  paperId: number;
  commentId: number;
  parentCommentId?: number | null;
}

const useDeletePaperComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paperId, commentId }: DeleteCommentPayload) => {
      const { data } = await $http.delete(
        `/papers/${paperId}/comments/${commentId}`,
      );
      return data;
    },
    onSuccess: (_data, variables) => {
      const { paperId, parentCommentId } = variables as DeleteCommentPayload;

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

export default useDeletePaperComment;
