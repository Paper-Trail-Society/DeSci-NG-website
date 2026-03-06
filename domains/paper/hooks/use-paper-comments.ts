import { useInfiniteQuery } from '@tanstack/react-query';
import { $http } from '@/lib/http';

export type CommentSortDir = 'desc' | 'asc';

export interface PaperCommentAuthor {
  id: string;
  name: string;
  email: string
}

export interface PaperComment {
  id: number;
  paperId: number;
  authorId: string;
  parentCommentId: number | null;
  bodyMarkdown: string;
  bodyHtml: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: PaperCommentAuthor;
}

export interface FetchCommentsResponse {
  data: PaperComment[];
  meta: {
    hasMore: boolean;
    nextCursor: string | null;
    limit: number;
  };
}

const usePaperComments = (paperId: number, sortDir: CommentSortDir = 'desc', limit = 5) => {
  return useInfiniteQuery<FetchCommentsResponse>({
    queryKey: ['paper-comments', paperId, sortDir],
    queryFn: async ({ pageParam }) => {
      const { data } = await $http.get(`/papers/${paperId}/comments`, {
        params: {
          limit,
          cursor: pageParam,
          sortDir: sortDir,
        },
      });
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasMore ? lastPage.meta.nextCursor : undefined;
    },
  });
};

export default usePaperComments;