"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useDeletePaper from "@/domains/paper/hooks/use-delete-paper";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { Paper } from "@/domains/paper/types";
import { paperKeys } from "@/lib/react-query/query-keys";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { format } from "date-fns";
import { PenSquare, SearchIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import DeletePaperDialog from "@/domains/paper/components/delete-paper-dialog";
import Pagination from "@/components/ui/pagination";

function ManagePapersContent() {
  const { user } = useAuthContext();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1500);
  const [pendingDeletePaper, setPendingDeletePaper] = useState<Paper | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data: papers, isLoading } = useGetPapers({
    search: debouncedSearchValue,
    userId: user?.id,
    page: currentPage,
    isEnabled: !!user?.id,
  });
  const { mutate: deletePaper, isPending: isDeletingPaper } = useDeletePaper();
  const totalPages = papers
    ? Math.max(1, Math.ceil(papers.total / Math.max(1, papers.size)))
    : 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchValue]);

  const handleConfirmDelete = () => {
    if (!pendingDeletePaper) return;

    deletePaper(pendingDeletePaper.id, {
      onSuccess: async (response) => {
        const nextPage =
          papers && papers.data.length === 1 && currentPage > 1
            ? currentPage - 1
            : currentPage;

        if (nextPage !== currentPage) {
          setCurrentPage(nextPage);
        }

        await queryClient.invalidateQueries({
          queryKey: paperKeys.list(
            debouncedSearchValue ?? "",
            user?.id?.toString() ?? "",
            nextPage.toString()
          ),
        });
        await queryClient.invalidateQueries({ queryKey: paperKeys.all });
        toast.success(response?.message ?? "Paper deleted successfully");
        setPendingDeletePaper(null);
        setIsDeleteDialogOpen(false);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ??
              error.response?.data ??
              "Unable to delete paper"
          );
        } else {
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to delete paper. Try again."
          );
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="md:p-container-lg p-container-base">
        <section className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-container-base shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Text className="text-sm uppercase tracking-wide text-gray-600">
              <Link
                href="/dashboard/profile"
                className="transition-colors hover:text-[#B52221]"
              >
                Your Profile
              </Link>
            </Text>

            <div className="flex items-center gap-3">
              <Text className="text-xl md:text-2xl" weight={"semibold"}>
                Manage Papers
              </Text>
            </div>

            <Text className="text-sm uppercase tracking-wide text-gray-600">
              <Link
                href="/upload-paper"
                className="transition-colors hover:text-[#B52221]"
              >
                Upload New Paper
              </Link>
            </Text>
          </header>

          <div className="space-y-6">
            <div className="relative max-w-xl">
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by title, keyword, or author"
                className="rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition focus:border-[#B52221]/40 focus:ring-[#B52221]/30"
                autoComplete="off"
                inputMode="search"
              />
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
                    >
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                      <div className="flex gap-3">
                        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : papers?.total === 0 ? (
                <div className="space-y-2 py-12 text-center">
                  <Text size={"lg"} weight={"semibold"}>
                    No papers yet
                  </Text>
                  <Text size={"sm"} className="text-gray-500">
                    Upload your first paper to see it appear here.
                  </Text>
                </div>
              ) : (
                papers?.data.map((paper) => (
                  <Card
                    key={paper.id}
                    className="border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-3">
                        <Link
                          href={`/paper/${paper.slug}`}
                          className="text-lg font-semibold leading-snug text-gray-900 transition-colors hover:text-[#B52221]"
                        >
                          {paper.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span>
                            {format(new Date(paper.createdAt), "MMM d, yyyy")}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-2">
                            {paper.keywords.slice(0, 3).map((keyword) => (
                              <span
                                key={keyword.id}
                                className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600"
                              >
                                {keyword.name}
                              </span>
                            ))}
                            {paper.keywords.length > 3 && (
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">
                                +{paper.keywords.length - 3}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant={"outline"}
                          className="rounded-full border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-[#B52221]/40 hover:text-[#B52221] hover:shadow-md"
                          asChild
                        >
                          <Link
                            href={`/paper/${paper.slug}/edit`}
                            className="flex items-center gap-2"
                          >
                            <PenSquare className="h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="rounded-full border border-transparent bg-[#FCEBEC] px-4 py-2 text-sm text-[#B52221] transition hover:bg-[#B52221] hover:text-white hover:shadow-md"
                          onClick={() => {
                            setPendingDeletePaper(paper);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    if (page < 1) return;
                    if (page > totalPages) return;
                    setCurrentPage(page);
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      <DeletePaperDialog
        paper={pendingDeletePaper}
        isOpen={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) {
            setPendingDeletePaper(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        isSubmitting={isDeletingPaper}
      />
    </div>
  );
}

export default function ManagePapersPage() {
  return (
    <RouteGuard>
      <ManagePapersContent />
    </RouteGuard>
  );
}
