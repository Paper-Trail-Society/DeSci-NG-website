"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import { useDebounce } from "use-debounce";

const Page = () => {
  const { user } = useAuthContext();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1500);
  const { data: papers, isLoading } = useGetPapers({
    search: debouncedSearchValue,
    userId: user?.id,
    isEnabled: !!user?.id,
  });

  return (
    <div className="md:p-container-lg p-container-base">
      <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto md:px-container-md md:py-container-base p-container-base">
        <div className="flex flex-wrap justify-between">
          <Text className="md:text-lg text-md" weight={"bold"}>
            Your Profile
          </Text>
          <div className="flex items-center gap-2">
            <div className="bg-[#B52221] h-5 w-1 rounded-md"></div>
            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link href="/upload-paper">Upload New Paper</Link>
            </Text>
          </div>

          <Text className="md:text-lg text-md" weight={"bold"}>
            Manage Papers
          </Text>
        </div>

        <div className="flex flex-col space-y-12 mt-16">
          <section className="relative w-1/2">
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search papers"
              className="md:p-6 p-2 bg-white placeholder:text-xs"
              name="search"
            />

            <SearchIcon className="absolute w-3 h-3 top-3.25 right-1 md:top-4.25 md:right-3 text-[#0B0B0B]" />
          </section>

          <section>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : papers?.total === 0 ? (
              <Text size={'sm'} className="text-center">No papers found</Text>
            ) : (
              papers?.data.map((paper) => {
                return (
                  <Card
                    key={paper.id}
                    className="border-none bg-white flex justify-between"
                  >
                    <div>
                      <CardHeader>
                        <CardTitle className="font-medium">
                          {paper.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex gap-4">
                        <Text size={"xs"} className="text-text-dim">
                          {format(new Date(paper.createdAt), "MMM d, yyyy")}
                        </Text>
                        <Text size={"xs"} className="text-text-dim">
                          150 downloads
                        </Text>
                      </CardContent>
                    </div>
                    <div className="flex gap-4 h-10 my-auto pr-6">
                      <Button variant={"outline"} className="text-text-dim">
                        Edit
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="border border-primary p-2 text-text-dim"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Page;
