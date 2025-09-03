"use client";

import PaperSearchInput from "@/components/shared/paper-search-input";
import { Text } from "@/components/ui/text";
import PaperCard from "@/domains/paper/components/paper-card";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchQuery = useSearchParams().get("query");

  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-14 items-center pt-10 pb-20 w-full">
        <div className="space-y-4">
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
          <PaperCard />
          <PaperCard />

          <PaperCard />
        </div>
      </main>
    </div>
  );
};

export default page;
