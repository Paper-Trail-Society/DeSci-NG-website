import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaperComment } from "../hooks/use-paper-comments";
import { formatDistanceToNow } from "date-fns";
import CommentInputField from "./comment-input-field";
import CommentReplies from "./comment-replies";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { PenSquareIcon, Trash2Icon, MessageSquarePlusIcon, MessagesSquareIcon} from "lucide-react";
import {
  getCommentDisplayHtml,
  getCommentEditText,
} from "../utils/comment-format";

interface CommentItemBaseProps {
  comment: PaperComment;
  onReply?: (content: string, parentId: number) => Promise<void>;
  isReply?: boolean;
  paperId?: number;
  onEdit?: (comment: PaperComment) => void;
  onDelete?: (comment: PaperComment) => void;
  onCancelEdit?: () => void;
  onSubmitEdit?: (comment: PaperComment, body: string) => void;
  isEditSubmitting?: boolean;
  editingCommentId?: number | null;
}

type CommentItemProps = CommentItemBaseProps;

const CommentItem = (props: CommentItemProps) => {
  const { comment, isReply = false, paperId, editingCommentId } = props;
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { user } = useAuthContext();
  const author = comment.author;

  let dateText = "";
  try {
    if (comment.createdAt) {
      dateText = formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
      });
    }
  } catch (e) {}

  const isParent = !isReply && !comment.parentCommentId;
  const isOwnComment = !!user && String(user.id) === String(comment.authorId);
  const isEditing = editingCommentId === comment.id;

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <CommentItemView
      {...props}
      isReply={isReply}
      paperId={paperId}
      isReplying={isReplying}
      setIsReplying={setIsReplying}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      showReplies={showReplies}
      setShowReplies={setShowReplies}
      isParent={isParent}
      isOwnComment={isOwnComment}
      author={author}
      dateText={dateText}
      handleToggleReplies={handleToggleReplies}
      isEditing={isEditing}
    />
  );
};

export const ParentCommentItem = (
  props: Omit<CommentItemProps, "isReply">,
) => {
  return <CommentItem {...props} isReply={false} />;
};

export const ReplyCommentItem = (
  props: Omit<CommentItemProps, "isReply">,
) => {
  return <CommentItem {...props} isReply />;
};

interface CommentItemViewProps extends CommentItemBaseProps {
  isReply: boolean;
  paperId?: number;
  isReplying: boolean;
  setIsReplying: (value: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  showReplies: boolean;
  setShowReplies: (value: boolean) => void;
  isParent: boolean;
  isOwnComment: boolean;
  author: PaperComment["author"];
  dateText: string;
  handleToggleReplies: () => void;
  isEditing: boolean;
}

const CommentItemView = (props: CommentItemViewProps) => {
  const {
    comment,
    onReply,
    isReply = false,
    paperId,
    onEdit,
    onDelete,
    onCancelEdit,
    onSubmitEdit,
    isEditSubmitting = false,
    editingCommentId,
    isReplying,
    setIsReplying,
    isSubmitting,
    setIsSubmitting,
    showReplies,
    setShowReplies,
    isParent,
    isOwnComment,
    author,
    dateText,
    handleToggleReplies,
    isEditing,
  } = props;

  const getReplyLabel = () => {
    if (showReplies) return "Hide";
    return "Replies";
  };

  return (
    <div className={`group flex flex-col ${isReply ? "py-3" : "py-4"}`}>
      <CommentHeader
        author={author}
        dateText={dateText}
        isReply={isReply}
        isOwnComment={isOwnComment}
        comment={comment}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div className="flex w-full min-w-0 flex-col pl-1 md:pl-11">
        <CommentBody
          comment={comment}
          isEditing={isEditing}
          isEditSubmitting={isEditSubmitting}
          onSubmitEdit={onSubmitEdit}
          onCancelEdit={onCancelEdit}
        />

        <CommentActionsRow
          isParent={isParent}
          onReply={onReply}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          paperId={paperId}
          handleToggleReplies={handleToggleReplies}
          getReplyLabel={getReplyLabel}
        />

        {isReplying && onReply && (
          <CommentReplyInput
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onReply={onReply}
            commentId={comment.id}
            authorName={author.name}
            setIsReplying={setIsReplying}
            setShowReplies={setShowReplies}
          />
        )}

        <CommentRepliesSection
          isParent={isParent}
          paperId={paperId}
          onReply={onReply}
          showReplies={showReplies}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          editingCommentId={editingCommentId}
          onCancelEdit={onCancelEdit}
          onSubmitEdit={onSubmitEdit}
          isEditSubmitting={isEditSubmitting}
        />
      </div>
    </div>
  );
};

interface CommentHeaderProps {
  author: PaperComment["author"];
  dateText: string;
  isReply: boolean;
  isOwnComment: boolean;
  comment: PaperComment;
  onEdit?: (comment: PaperComment) => void;
  onDelete?: (comment: PaperComment) => void;
}

const CommentHeader = ({
  author,
  dateText,
  isReply,
  isOwnComment,
  comment,
  onEdit,
  onDelete,
}: CommentHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex gap-3">
        <div className="shrink-0 pt-0.5">
          <Avatar
            className={`${isReply ? "size-6" : "size-8"} ring-2 ring-white`}
          >
            <AvatarImage />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {author.name.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center gap-1.5">
          <Text
            size={"sm"}
            weight={"semibold"}
            className="truncate text-neutral-900"
          >
            {author.name}
          </Text>
          <Text size={"xs"} className="text-neutral-400 shrink-0">
            &middot;
          </Text>
          <Text size={"xs"} className="text-neutral-400 shrink-0">
            {dateText}
          </Text>
        </div>
      </div>

      {isOwnComment && (
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-7 w-7 text-neutral-400 hover:text-neutral-700"
            type="button"
            onClick={() => onEdit?.(comment)}
          >
            <PenSquareIcon className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-7 w-7 text-neutral-400 hover:text-red-600"
            type="button"
            onClick={() => onDelete?.(comment)}
          >
            <Trash2Icon className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
};

interface CommentBodyProps {
  comment: PaperComment;
  isEditing: boolean;
  isEditSubmitting: boolean;
  onSubmitEdit?: (comment: PaperComment, body: string) => void;
  onCancelEdit?: () => void;
}

const CommentBody = ({
  comment,
  isEditing,
  isEditSubmitting,
  onSubmitEdit,
  onCancelEdit,
}: CommentBodyProps) => {
  if (isEditing && onSubmitEdit) {
    return (
      <div className="mt-1 md:mt-0">
        <CommentInputField
          isSubmitting={isEditSubmitting}
          placeholder="Edit your comment..."
          compact
          initialContent={getCommentEditText(comment)}
          onSubmitComment={(body) => onSubmitEdit(comment, body)}
        />
        {onCancelEdit && (
          <div className="mt-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-neutral-500 hover:text-neutral-800"
              type="button"
              onClick={onCancelEdit}
              disabled={isEditSubmitting}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="prose prose-sm prose-neutral mt-1 md:mt-0 max-w-none text-sm leading-relaxed text-neutral-700 prose-p:my-0.5 prose-a:text-primary wrap-break-word"
      dangerouslySetInnerHTML={{ __html: getCommentDisplayHtml(comment) }}
    />
  );
};

interface CommentActionsRowProps {
  isParent: boolean;
  onReply?: (content: string, parentId: number) => Promise<void>;
  isReplying: boolean;
  setIsReplying: (value: boolean) => void;
  paperId?: number;
  handleToggleReplies: () => void;
  getReplyLabel: () => string;
}

const CommentActionsRow = ({
  isParent,
  onReply,
  isReplying,
  setIsReplying,
  paperId,
  handleToggleReplies,
  getReplyLabel,
}: CommentActionsRowProps) => {
  if (!isParent || !onReply) return null;

  return (
    <div className="mt-2 flex items-center gap-3">
      <Button
        variant={"ghost"}
        onClick={() => setIsReplying(!isReplying)}
        className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition-colors"
      >
        <MessageSquarePlusIcon className="size-3.5" />
        <Text size={"xs"} weight={"semibold"}>
          {isReplying ? "Cancel" : "Reply"}
        </Text>
      </Button>

      {paperId && (
        <Button
          variant={"ghost"}
          onClick={handleToggleReplies}
          className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <MessagesSquareIcon className="size-3.5" />
          <Text size={"xs"} weight={"semibold"}>
            {getReplyLabel()}
          </Text>
        </Button>
      )}
    </div>
  );
};

interface CommentReplyInputProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  onReply: (content: string, parentId: number) => Promise<void>;
  commentId: number;
  authorName: string;
  setIsReplying: (value: boolean) => void;
  setShowReplies: (value: boolean) => void;
}

const CommentReplyInput = ({
  isSubmitting,
  setIsSubmitting,
  onReply,
  commentId,
  authorName,
  setIsReplying,
  setShowReplies,
}: CommentReplyInputProps) => {
  return (
    <div className="mt-3 w-full">
      <CommentInputField
        isSubmitting={isSubmitting}
        placeholder={`Reply to ${authorName}...`}
        compact
        onSubmitComment={async (content) => {
          setIsSubmitting(true);
          try {
            await onReply(content, commentId);
            setIsReplying(false);
            setShowReplies(true);
          } catch (e) {
            // Error handled by parent
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </div>
  );
};

interface CommentRepliesSectionProps {
  isParent: boolean;
  paperId?: number;
  onReply?: (content: string, parentId: number) => Promise<void>;
  showReplies: boolean;
  comment: PaperComment;
  onEdit?: (comment: PaperComment) => void;
  onDelete?: (comment: PaperComment) => void;
  editingCommentId?: number | null;
  onCancelEdit?: () => void;
  onSubmitEdit?: (comment: PaperComment, body: string) => void;
  isEditSubmitting?: boolean;
}

const CommentRepliesSection = ({
  isParent,
  paperId,
  onReply,
  showReplies,
  comment,
  onEdit,
  onDelete,
  editingCommentId,
  onCancelEdit,
  onSubmitEdit,
  isEditSubmitting,
}: CommentRepliesSectionProps) => {
  if (!isParent || !paperId || !onReply || !showReplies) return null;

  return (
    <CommentReplies
      paperId={paperId}
      parentCommentId={comment.id}
      onReply={onReply}
      onEdit={onEdit}
      onDelete={onDelete}
      editingCommentId={editingCommentId}
      onCancelEdit={onCancelEdit}
      onSubmitEdit={onSubmitEdit}
      isEditSubmitting={isEditSubmitting}
    />
  );
};

export default CommentItem;
