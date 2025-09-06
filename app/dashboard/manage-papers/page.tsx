"use client";
import AuthNav from "@/components/shared/auth-nav";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useGetPapers from "@/domains/paper/hooks/use-get-papers";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
    <div className=" bg-gray-50">
      <AuthNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-6">
              Manage Papers
            </Text>

            <div className="relative max-w-md">
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search papers"
                className="pl-4 pr-10 py-2"
                name="search"
              />
              <SearchIcon className="absolute w-4 h-4 top-3 right-3 text-gray-400" />
            </div>
          </div>

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
                    className="border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center p-6">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-medium mb-2">
                          <Link
                            href={`/papers/${paper.id}`}
                            className="hover:text-[#B52221] transition-colors"
                          >
                            {paper.title}
                          </Link>
                        </CardTitle>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>
                            {format(new Date(paper.createdAt), "MMM d, yyyy")}
                          </span>
                          <span>150 downloads</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
