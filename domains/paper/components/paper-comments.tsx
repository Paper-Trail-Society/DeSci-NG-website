'use client';

import { AxiosError } from 'axios';
import { MessageCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { toast } from 'sonner';

import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils/css';
import { Text } from '@/components/ui/text';
import { useGetMe } from '@/domains/auth/hooks/use-user';
import CommentInputField from './comment-input-field';
import CommentItem from './comment-item';
import { useAddPaperComment } from '../hooks/use-add-paper-comment';
import usePaperComments, { CommentSortDir, PaperComment } from '../hooks/use-paper-comments';

type CommentSectionProps = {
  paperId: number;
};

const PaperComments = ({ paperId }: CommentSectionProps) => {
  const { data: user } = useGetMe();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<CommentSortDir>('desc');
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading: isFetchingComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = usePaperComments(paperId, currentSort);

  const { mutate: addComment, isPending: isAddCommentPending } = useAddPaperComment();

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
            <button
              onClick={() => setCurrentSort('desc')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
                currentSort === 'desc'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Newest
            </button>
            <button
              onClick={() => setCurrentSort('asc')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
                currentSort === 'asc'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Oldest
            </button>
          </div>
        )}
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <CommentInputField
          isSubmitting={isAddCommentPending}
          placeholder="Write a comment..."
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
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReplyComment}
              paperId={paperId}
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
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in Required</DialogTitle>
            <DialogDescription>
              You must be signed in to post a comment. Please sign in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)}>
              Cancel
            </Button>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PaperComments;