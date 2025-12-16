"use client";

import PaperSearchInput from "@/components/shared/paper-search-input";
import PublicNav from "@/components/shared/public-nav";
import Pagination from "@/components/ui/pagination";
import { Text } from "@/components/ui/text";
import PaperCard from "@/domains/paper/components/paper-card";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ?? "1"
  );

  const { data: response, isPending: isLoadingPapers } = useGetPapers({
    search: searchQuery ?? undefined,
    page: parseInt(currentPage, 10),
  });

  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col gap-14 items-center pt-10 pb-20 w-full">
          <div className="space-y-4 lg:w-2/5 md:w-4/5 w-full px-8">
            {searchQuery && (
              <Text as="p" className="w-full text-center">
                <Text className="text-3xl">
                  Showing results for: <b>{decodeURIComponent(searchQuery)}</b>{" "}
                </Text>
              </Text>
            )}
            <PaperSearchInput className="w-full" />
          </div>

          <div className="flex flex-col gap-2 lg:w-3/5 md:w-4/5 w-full px-8 mx-auto">
            {isLoadingPapers ? (
              <Text as="p" size={'sm'} className="text-center w-full mx-auto">
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

          <Pagination
            currentPage={parseInt(currentPage, 10)}
            totalPages={
              response ? Math.ceil(response?.total / response?.size) : 1
            }
            onPageChange={(page) => {
              setCurrentPage(page.toString());
              router.push(
                pathname + "?" + createQueryString("page", page.toString())
              );
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default SearchPageContent;