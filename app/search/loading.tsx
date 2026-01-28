import PaperSearchInput from "@/components/shared/paper-search-input";
import { Text } from "@/components/ui/text";
import React from "react";

const Loading = () => {
  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-14 items-center py-10 w-full">
        <div className="space-y-4 w-2/5">
          <PaperSearchInput className="w-full" />
        </div>
        <div className="flex flex-col gap-2 w-3/5 mx-auto">
          <Text as="p" size={'sm'} className="text-center w-full">
            Loading...
          </Text>
        </div>
      </main>
    </div>
  );
};

export default Loading;
