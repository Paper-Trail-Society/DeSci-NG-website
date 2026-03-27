'use client';

import React, { useMemo } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import useCommentReplies from '../hooks/use-comment-replies';
import { PaperComment } from '../hooks/use-paper-comments';
import { ReplyCommentItem } from './comment-item';
import { Text } from '@/components/ui/text';

interface CommentRepliesProps {
  paperId: number;
  parentCommentId: number;
  onReply: (content: string, parentId: number) => Promise<void>;
  onEdit?: (comment: PaperComment) => void;
  onDelete?: (comment: PaperComment) => void;
  editingCommentId?: number | null;
  onCancelEdit?: () => void;
  onSubmitEdit?: (comment: PaperComment, body: string) => void;
  isEditSubmitting?: boolean;
}

const CommentReplies = ({
  paperId,
  parentCommentId,
  onReply,
  onEdit,
  onDelete,
  editingCommentId,
  onCancelEdit,
  onSubmitEdit,
  isEditSubmitting,
}: CommentRepliesProps) => {
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
        <ReplyCommentItem
          key={reply.id}
          comment={reply}
          onEdit={onEdit}
          onDelete={onDelete}
          onCancelEdit={onCancelEdit}
          onSubmitEdit={onSubmitEdit}
          isEditSubmitting={isEditSubmitting}
          editingCommentId={editingCommentId}
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
