import React, { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaperComment } from '../hooks/use-paper-comments';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquarePlus, MessagesSquare } from 'lucide-react';
import CommentInputField from './comment-input-field';
import CommentReplies from './comment-replies';
import useCommentReplies from '../hooks/use-comment-replies';
import { Text } from '@/components/ui/text';

interface CommentItemProps {
  comment: PaperComment;
  onReply?: (content: string, parentId: number) => Promise<void>;
  isReply?: boolean;
  paperId?: number;
}

const CommentItem = ({ comment, onReply, isReply = false, paperId }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  // Once toggled, keep fetching so count stays up-to-date
  const [hasLoadedReplies, setHasLoadedReplies] = useState(false);
  
  const author = comment.author;
  
  let dateText = '';
  try {
    if (comment.createdAt) {
      dateText = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
    }
  } catch (e) {}

  const isParent = !isReply && !comment.parentCommentId;

  // Fetch replies at item level so we can show the count on the button
  const {
    data: repliesData,
  } = useCommentReplies(
    paperId ?? 0,
    comment.id,
    'asc',
    isParent && !!paperId && hasLoadedReplies
  );

  const replyCount = useMemo(() => {
    if (!repliesData?.pages) return 0;
    return repliesData.pages.reduce((total, page) => total + (page?.data?.length ?? 0), 0);
  }, [repliesData]);

  const handleToggleReplies = () => {
    if (!hasLoadedReplies) {
      setHasLoadedReplies(true);
    }
    setShowReplies(!showReplies);
  };

  const getReplyLabel = () => {
    if (showReplies) return 'Hide';
    if (replyCount > 0) return `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`;
    return 'Replies';
  };

  return (
    <div className={`group flex gap-3 ${isReply ? 'py-3' : 'py-4'}`}>
      <div className="shrink-0 pt-0.5">
        <Avatar className={`${isReply ? 'size-6' : 'size-8'} ring-2 ring-white`}>
          <AvatarImage />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">{author.name.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        {/* Author + Time */}
        <div className="flex items-center gap-1.5">
          <Text size={"sm"} weight={"semibold"} className="truncate text-neutral-900">{author.name}</Text>
          <Text size={"xs"} className="text-neutral-400 shrink-0">&middot;</Text>
          <Text size={"xs"} className="text-neutral-400 shrink-0">{dateText}</Text>
        </div>
        
        {/* Body */}
        <div 
          className="prose prose-sm prose-neutral mt-1 max-w-none text-sm leading-relaxed text-neutral-700 prose-p:my-0.5 prose-a:text-primary wrap-break-word"
          dangerouslySetInnerHTML={{ __html: comment.bodyHtml }}
        />

        {/* Actions row: Reply + Show Replies on same line */}
        {isParent && onReply && (
          <div className="mt-2 flex items-center gap-3">
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <MessageSquarePlus className="size-3.5" />
              <Text size={"xs"} weight={"semibold"}>{isReplying ? 'Cancel' : 'Reply'}</Text>
            </button>

            {paperId && (
              <button 
                onClick={handleToggleReplies}
                className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <MessagesSquare className="size-3.5" />
                <Text size={"xs"} weight={"semibold"}>{getReplyLabel()}</Text>
              </button>
            )}
          </div>
        )}

        {/* Reply input */}
        {isReplying && onReply && (
          <div className="mt-3 w-full">
            <CommentInputField 
              isSubmitting={isSubmitting}
              placeholder={`Reply to ${name}...`}
              compact
              onSubmitComment={async (content) => {
                setIsSubmitting(true);
                try {
                  await onReply(content, comment.id);
                  setIsReplying(false);
                  setHasLoadedReplies(true);
                  setShowReplies(true);
                } catch (e) {
                  // Error handled by parent
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          </div>
        )}

        {/* Nested replies */}
        {isParent && paperId && onReply && showReplies && (
          <CommentReplies
            paperId={paperId}
            parentCommentId={comment.id}
            onReply={onReply}
          />
        )}
      </div>
    </div>
  );
};

export default CommentItem;
