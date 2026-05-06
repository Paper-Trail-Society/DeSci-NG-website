"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import DashboardPaperNav from "@/components/shared/dashboard-paper-nav";
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
import { PenSquareIcon, SearchIcon, Trash2Icon } from "lucide-react";
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
    <div className="bg-white">
      <div className="md:p-container-lg p-container-base">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-container-base shadow-sm">
          <div className="-mx-1 md:mx-0">
            <DashboardPaperNav />
          </div>

          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <Text className="text-xl md:text-2xl" weight={"semibold"}>
                Manage Papers
              </Text>
              <Text size="sm" className="max-w-2xl leading-6 text-gray-500">
                Search, edit, and remove the papers you have uploaded.
              </Text>
            </div>
          </header>

          <div className="space-y-6">
            <div className="relative w-full max-w-xl">
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by title, keyword, or author"
                className="h-11 rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition focus:border-[#B52221]/40 focus:ring-[#B52221]/30"
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
                      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm md:p-6"
                    >
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                      <div className="flex flex-wrap gap-3">
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
                    className="border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0 space-y-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                          <Link
                            href={`/paper/${paper.slug}`}
                            className="text-base font-semibold leading-snug text-gray-900 transition-colors hover:text-[#B52221] md:text-lg"
                          >
                            {paper.title}
                          </Link>
                          <span
                            className={`
                              w-fit rounded-full px-2.5 py-1 text-xs font-medium
                              ${
                                paper.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : paper.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>{format(new Date(paper.createdAt), "MMM d, yyyy")}</span>
                          {paper.keywords && paper.keywords.length > 0 && (
                            <>
                              <span className="hidden text-gray-300 sm:inline">•</span>
                              <div className="flex flex-wrap gap-2">
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
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                        <Button
                          variant={"outline"}
                          className="w-full rounded-full border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-[#B52221]/40 hover:text-[#B52221] hover:shadow-md sm:w-auto"
                          asChild
                        >
                          <Link
                            href={`/paper/${paper.slug}/edit`}
                            className="flex items-center justify-center gap-2"
                          >
                            <PenSquareIcon className="h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="w-full rounded-full border border-transparent bg-[#FCEBEC] px-4 py-2 text-sm text-[#B52221] transition hover:bg-[#B52221] hover:text-white hover:shadow-md sm:w-auto"
                          onClick={() => {
                            setPendingDeletePaper(paper);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Trash2Icon className="h-4 w-4" />
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
