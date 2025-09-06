"use client";

import PaperSearchInput from "@/components/shared/paper-search-input";
import PublicNav from "@/components/shared/public-nav";
import { Text } from "@/components/ui/text";
import PaperCard from "@/domains/paper/components/paper-card";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchQuery = useSearchParams().get("query");

  const { data: response, isLoading: isLoadingPapers } = useGetPapers({
    search: searchQuery ?? undefined,
  });

  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col gap-14 items-center pt-10 pb-20 w-full">
          <div className="space-y-4 w-2/5">
            {searchQuery && (
              <Text as="p" className="w-full text-center">
                <Text className="text-3xl">
                  Showing results for: <b>{decodeURIComponent(searchQuery)}</b>{" "}
                </Text>
              </Text>
            )}
            <PaperSearchInput className="w-full" />
          </div>

          <div className="flex flex-col gap-2 w-3/5 mx-auto">
            {isLoadingPapers ? (
              <Text as="p" className="text-center w-full">
                Loading...
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
                    <b>${decodeURIComponent(searchQuery ?? "")}</b>
                  </span>
                ) : (
                  "No papers found"
                )}
              </Text>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
