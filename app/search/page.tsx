import type { Metadata } from "next";
import SearchPageContent from "@/domains/paper/components/search-page-content";
import { PaginatedPapersResponse } from "@/domains/paper/types";
import { paperKeys } from "@/lib/react-query/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Nubian Research | Explore Papers",
  description:
    "Search and explore open-access papers across disciplines on Nubian Research.",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const getParam = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value) ?? "";
  };
  const search = getParam("q");
  const fieldId = getParam("fieldId");
  const categoryId = getParam("categoryId");
  const requestedPage = Number(getParam("page") || "1");
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const queryClient = new QueryClient();
  const requestParams = new URLSearchParams({ page: page.toString() });
  if (search) requestParams.set("search", search);
  if (fieldId) requestParams.set("fieldId", fieldId);
  if (categoryId) requestParams.set("categoryId", categoryId);

  await queryClient.ensureQueryData({
    queryKey: paperKeys.list(search, "", page.toString(), fieldId, categoryId),
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/papers?${requestParams.toString()}`,
      );
      if (!response.ok) throw new Error("Unable to fetch papers");
      return response.json() as Promise<PaginatedPapersResponse>;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <SearchPageContent />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
