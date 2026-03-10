import { useInfiniteQuery } from '@tanstack/react-query';
import { $http } from '@/lib/http';
import { FetchCommentsResponse, CommentSortDir } from './use-paper-comments';

const useCommentReplies = (
  paperId: number,
  parentCommentId: number,
  sortDir: CommentSortDir = 'asc',
  enabled = false,
  limit = 5
) => {
  return useInfiniteQuery<FetchCommentsResponse>({
    queryKey: ['comment-replies', paperId, parentCommentId, sortDir],
    queryFn: async ({ pageParam }) => {
      const { data } = await $http.get(`/papers/${paperId}/comments`, {
        params: {
          limit,
          cursor: pageParam,
          sortDir,
          parentCommentId,
        },
      });
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasMore ? lastPage.meta.nextCursor : undefined;
    },
    enabled,
  });
};

export default useCommentReplies;
