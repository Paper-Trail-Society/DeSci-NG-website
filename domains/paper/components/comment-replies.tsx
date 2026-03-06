'use client';

import React, { useMemo } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import useCommentReplies from '../hooks/use-comment-replies';
import { PaperComment } from '../hooks/use-paper-comments';
import CommentItem from './comment-item';
import { Text } from '@/components/ui/text';

interface CommentRepliesProps {
  paperId: number;
  parentCommentId: number;
  onReply: (content: string, parentId: number) => Promise<void>;
}

const CommentReplies = ({ paperId, parentCommentId, onReply }: CommentRepliesProps) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useCommentReplies(paperId, parentCommentId, 'asc', true);

  const replies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page?.data ?? []);
  }, [data]);

  return (
    <div className="mt-2 ml-1 border-l-2 border-neutral-100 pl-3">
      {isLoading && replies.length === 0 && (
        <div className="flex items-center gap-2 py-3">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" />
          <Text size={"xs"} className="text-neutral-400">Loading replies...</Text>
        </div>
      )}

      {replies.map((reply: PaperComment) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          isReply
        />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="flex items-center gap-1 py-2 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          {isFetchingNextPage ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <ChevronDown className="size-3" />
          )}
          <Text size={"xs"} weight={"semibold"}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Text>
        </button>
      )}
    </div>
  );
};

export default CommentReplies;
