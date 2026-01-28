"use client";

import PaperSearchInput from "@/components/shared/paper-search-input";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import PaperCard from "@/domains/paper/components/paper-card";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ?? "1",
  );
  const currentPageNumber = parseInt(currentPage, 10);

  const { data: response, isPending: isLoadingPapers } = useGetPapers({
    search: searchQuery ?? undefined,
    page: currentPageNumber,
  });

  const totalPages = response ? Math.ceil(response.total / response.size) : 1;

  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page.toString());
    router.push(pathname + "?" + createQueryString("page", page.toString()));
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col gap-8 items-center py-10 px-4 w-full">
          <div className="w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <div className="space-y-4 lg:w-2/5 md:w-4/5 w-full">
            <section>
              {searchQuery && (
                <Text as="p" className="w-full text-left md:text-center">
                  <Text className="text-xl md:text-2xl">
                    Showing results for:{" "}
                    <b>{decodeURIComponent(searchQuery)}</b>{" "}
                  </Text>
                </Text>
              )}
              {searchQuery && !isLoadingPapers && response && (
                <Text as="p" className="w-full text-sm text-muted-foreground">
                  {response.total} paper{response.total === 1 ? "" : "s"} found
                </Text>
              )}
            </section>

            <PaperSearchInput className="w-full" />
          </div>

          <div className="flex flex-col gap-2 lg:w-3/5 md:w-4/5 w-full mx-auto">
            {isLoadingPapers ? (
              <Text as="p" size={"sm"} className="text-center w-full mx-auto">
                Loading papers...
              </Text>
            ) : response?.data.length ? (
              response.data.map((paper) => {
                return <PaperCard key={paper.id} {...paper} />;
              })
            ) : (
              <Text as="p" className="text-center w-full">
                {searchQuery ? (
                  <span>
                    No papers found for{" "}
                    <b>{decodeURIComponent(searchQuery ?? "")}</b>
                  </span>
                ) : (
                  "No papers found"
                )}
              </Text>
            )}
          </div>

          {/* Desktop / tablet pagination */}
          <div className="hidden md:block">
            <Pagination
              currentPage={currentPageNumber}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Mobile "Load more" pagination */}
          {!isLoadingPapers && response && currentPageNumber < totalPages && (
            <div className="w-full md:hidden justify-center">
              <Button
                size="lg"
                variant="destructive"
                className="mx-auto"
                onClick={() => handlePageChange(currentPageNumber + 1)}
              >
                Load more papers
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPageContent;
