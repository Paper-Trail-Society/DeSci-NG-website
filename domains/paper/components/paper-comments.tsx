'use client';

import { AxiosError } from "axios";
import { MessageCircle, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils/css";
import { Text } from "@/components/ui/text";
import { useGetMe } from "@/domains/auth/hooks/use-user";
import CommentInputField from "./comment-input-field";
import CommentItem, { ParentCommentItem } from "./comment-item";
import { useAddPaperComment } from "../hooks/use-add-paper-comment";
import usePaperComments, {
  CommentSortDir,
  PaperComment,
} from "../hooks/use-paper-comments";
import AuthRequiredDialog from "@/domains/auth/components/auth-required-dialog";
import useUpdatePaperComment from "../hooks/use-update-paper-comment";
import useDeletePaperComment from "../hooks/use-delete-paper-comment";

type CommentSectionProps = {
  paperId: number;
  paperSlug: string
};

const PaperComments = ({ paperId, paperSlug }: CommentSectionProps) => {
  const { data: user } = useGetMe();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<CommentSortDir>('desc');
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentPendingDelete, setCommentPendingDelete] =
    useState<PaperComment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data,
    isLoading: isFetchingComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = usePaperComments(paperId, currentSort);

  const { mutate: addComment, isPending: isAddCommentPending } = useAddPaperComment();
  const {
    mutate: updateComment,
    isPending: isUpdateCommentPending,
  } = useUpdatePaperComment();
  const {
    mutate: deleteComment,
    isPending: isDeleteCommentPending,
  } = useDeletePaperComment();

  const comments = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page?.data ?? []);
  }, [data]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmitComment = (content: string) => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    addComment(
      {
        paperId,
        body: content,
        user,
        sortDir: currentSort,
      },
      {
        onSuccess: () => {
          toast.success('Comment posted successfully!', { id: 'add-comment' });
        },
        onError: (err: any) => {
          if (err instanceof AxiosError) {
            toast.error(err.response?.data.error || `An error occurred. ${err.message}`);
          } else {
            toast.error('Failed to post comment');
          }
        },
      }
    );
  };

  const handleReplyComment = async (content: string, parentId: number) => {
    return new Promise<void>((resolve, reject) => {
      if (!user) {
        setIsAuthDialogOpen(true);
        reject(new Error('Unauthenticated'));
        return;
      }

      addComment(
        {
          paperId,
          body: content,
          user,
          sortDir: currentSort,
          parentCommentId: parentId,
        },
        {
          onSuccess: () => {
            toast.success('Reply posted!', { id: 'add-reply' });
            resolve();
          },
          onError: (err: any) => {
            if (err instanceof AxiosError) {
              toast.error(err.response?.data.error || `An error occurred. ${err.message}`);
            } else {
              toast.error('Failed to post reply');
            }
            reject(err);
          },
        }
      );
    });
  };

  const handleStartEditComment = (comment: PaperComment) => {
    setEditingCommentId(comment.id);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
  };

  const handleSubmitEditComment = (comment: PaperComment, body: string) => {
    updateComment(
      {
        paperId,
        commentId: comment.id,
        body,
        parentCommentId: comment.parentCommentId,
      },
      {
        onSuccess: () => {
          toast.success("Comment updated", { id: "update-comment" });
          setEditingCommentId(null);
        },
        onError: (err: any) => {
          if (err instanceof AxiosError) {
            toast.error(
              err.response?.data.error ||
                `Unable to update comment. ${err.message}`,
            );
          } else {
            toast.error("Unable to update comment");
          }
        },
      },
    );
  };

  const handleRequestDeleteComment = (comment: PaperComment) => {
    setCommentPendingDelete(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDeleteComment = () => {
    if (!commentPendingDelete) return;

    deleteComment(
      {
        paperId,
        commentId: commentPendingDelete.id,
        parentCommentId: commentPendingDelete.parentCommentId,
      },
      {
        onSuccess: () => {
          toast.success("Comment deleted", { id: "delete-comment" });
          setIsDeleteDialogOpen(false);
          setCommentPendingDelete(null);
        },
        onError: (err: any) => {
          if (err instanceof AxiosError) {
            toast.error(
              err.response?.data.error ||
                `Unable to delete comment. ${err.message}`,
            );
          } else {
            toast.error("Unable to delete comment");
          }
        },
      },
    );
  };

  return (
    <section className="relative mt-8 w-full">
      {/* Header + Sort */}
      <div className="mb-4 flex items-center justify-between">
        <Text as="h2" size={"sm"} weight={"bold"} className="text-accent-text font-nexa flex items-center gap-x-1.5 uppercase">
          <MessageCircle className="size-[18px]" />
          Comments
        </Text>

        {comments.length > 0 && (
          <div className="flex items-center rounded-full bg-neutral-100/80 p-0.5 shadow-inner backdrop-blur-sm">
            <Button
              onClick={() => setCurrentSort('desc')}
              variant={"ghost"}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
                currentSort === 'desc'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Newest
            </Button>
            <Button
              onClick={() => setCurrentSort('asc')}
              variant={"ghost"}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
                currentSort === 'asc'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Oldest
            </Button>
          </div>
        )}
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <CommentInputField
          isSubmitting={isAddCommentPending}
          placeholder="Write a comment (in plain text or markdown)..."
          onSubmitComment={handleSubmitComment}
        />
      </div>

      {/* Comments List */}
      <div ref={commentContainerRef} className="w-full">
        {comments.length === 0 && !isFetchingComments && (
          <div className="py-10 text-center">
            <Text size={"sm"} className="text-muted-foreground">No comments yet. Be the first to comment!</Text>
          </div>
        )}

        {error && (
          <div className="py-6 text-center">
            <Text size={"sm"} className="text-red-500">Error loading comments. Please refresh.</Text>
          </div>
        )}

        {isFetchingComments && comments.length === 0 && (
          <div className="flex flex-col gap-3 py-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="size-8 rounded-full bg-neutral-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                  <div className="h-3 w-full rounded bg-neutral-200" />
                  <div className="h-3 w-2/3 rounded bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="divide-y divide-neutral-100">
          {comments.map((comment: PaperComment) => (
            <ParentCommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReplyComment}
              paperId={paperId}
              onEdit={handleStartEditComment}
              onDelete={handleRequestDeleteComment}
              onCancelEdit={handleCancelEditComment}
              onSubmitEdit={handleSubmitEditComment}
              isEditSubmitting={isUpdateCommentPending}
              editingCommentId={editingCommentId}
            />
          ))}
        </div>

        {hasNextPage && (
          <div ref={observerTarget} className="flex justify-center py-6">
            {isFetchingNextPage && <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />}
          </div>
        )}

        {!hasNextPage && comments.length > 0 && (
          <div className="py-4 text-center">
            <Text size={"xs"} className="text-neutral-400">End of comments</Text>
          </div>
        )}
      </div>

      {/* Auth Dialog */}
      <AuthRequiredDialog 
        open={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
        description='You must be signed in to post a comment. Please sign in or create an account to continue.'
        returnTo={`/paper/${paperSlug}`}
      />

      {/* Delete Comment Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) {
            setCommentPendingDelete(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete comment?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The selected comment and its
              replies (if any) will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end sm:flex-row-reverse gap-3">
            <Button
              variant="destructive"
              className="rounded-full px-6 text-sm flex items-center gap-2"
              onClick={handleConfirmDeleteComment}
              disabled={isDeleteCommentPending}
            >
              <Trash2 className="h-4 w-4" />
              {isDeleteCommentPending ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-gray-200 text-sm text-gray-700"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleteCommentPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PaperComments;
