import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { PaperComment, CommentSortDir } from "./use-paper-comments";
import { paperCommentKeys } from "@/lib/react-query/query-keys";

interface AddCommentPayload {
  paperId: number;
  body: string;
  sortDir?: CommentSortDir;
  user?: any; // For optimistic update
  parentCommentId?: number;
}

export const useAddPaperComment = () => {
  const queryClient = useQueryClient();

  // Basic HTML entity encoder for optimistic updates
  const sanitizeOptimistic = (input: string) => {
    return input.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m] as string;
    });
  };

  return useMutation({
    mutationFn: async ({ paperId, body, parentCommentId }: AddCommentPayload) => {
      const { data } = await $http.post(`/papers/${paperId}/comments`, {
        body,
        parentCommentId,
      });
      return data;
    },
    onMutate: async (newCommentInput) => {
      const { paperId, sortDir = "desc", user, body, parentCommentId } =
        newCommentInput;
      const queryKey = parentCommentId
        ? paperCommentKeys.replies(paperId, parentCommentId, "asc")
        : paperCommentKeys.list(paperId, sortDir);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old || !old.pages || old.pages.length === 0) return old;

        const optimisticComment: PaperComment = {
          id: Math.random() * -100000, // Temp ID
          bodyMarkdown: body,
          bodyHtml: `<p>${sanitizeOptimistic(body).replace(/\n/g, '<br/>')}</p>`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          paperId: paperId,
          authorId: String(user?.id || ''),
          parentCommentId: parentCommentId || null,
          author: {
             id: String(user?.id || ''),
             name: user?.name || user?.first_name || 'Anonymous',
             email: user?.email,
          }
        };

        const newPages = [...old.pages];
        // For replies, append at end; for top-level, prepend
        if (parentCommentId) {
          const lastIdx = newPages.length - 1;
          newPages[lastIdx] = {
            ...newPages[lastIdx],
            data: [...newPages[lastIdx].data, optimisticComment],
          };
        } else {
          newPages[0] = {
            ...newPages[0],
            data: [optimisticComment, ...newPages[0].data],
          };
        }

        return {
          ...old,
          pages: newPages,
        };
      });

      // Return a context object with the snapshotted value
      return { previousComments, queryKey, parentCommentId, paperId };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(context.queryKey, context.previousComments);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
      // Also invalidate the replies cache if this was a reply
      if (context?.parentCommentId && context?.paperId) {
        queryClient.invalidateQueries({
          queryKey: paperCommentKeys.replies(
            context.paperId,
            context.parentCommentId,
            "asc",
          ),
        });
      }
    },
  });
};
