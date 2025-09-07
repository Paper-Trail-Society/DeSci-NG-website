"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import PublicNav from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "use-debounce";

function ManagePapersContent() {
  const { user } = useAuthContext();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1500);
  const { data: papers, isLoading } = useGetPapers({
    search: debouncedSearchValue,
    userId: user?.id,
    isEnabled: !!user?.id,
  });

  return (
    <div>
      <PublicNav />
      <div className="md:p-container-lg p-container-base">
        <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto md:px-container-md md:py-container-base p-container-base">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-between mb-8">
            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/dashboard/profile"
                className="hover:text-[#B52221] transition-colors"
              >
                Your Profile
              </Link>
            </Text>

            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/upload-paper"
                className="hover:text-[#B52221] transition-colors"
              >
                Upload New Paper
              </Link>
            </Text>

            <div className="flex items-center gap-2">
              <div className="bg-[#B52221] h-5 w-1 rounded-md"></div>
              <Text className="md:text-lg text-md" weight={"bold"}>
                Manage Papers
              </Text>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search papers"
                  className="pl-4 pr-10 py-2 bg-white"
                  name="search"
                />
                <SearchIcon className="absolute w-4 h-4 top-3 right-3 text-gray-400" />
              </div>
            </div>

            {/* Papers List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <Text>Loading...</Text>
                </div>
              ) : papers?.total === 0 ? (
                <div className="text-center py-8">
                  <Text className="text-gray-500">No papers found</Text>
                </div>
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
                            <Link href={`/paper/${paper.id}`}>
                              {paper.title}
                            </Link>
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
                        <Button
                          variant={"outline"}
                          className="text-text-dim hover:bg-gray-100 px-4"
                        >
                          Edit
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="border border-primary p-2 text-text-dim hover:bg-primary/90 hover:text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ManagePapersPage() {
  return (
    <RouteGuard requireAuth>
      <ManagePapersContent />
    </RouteGuard>
  );
}
