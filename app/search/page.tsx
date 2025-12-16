import SearchPageContent from "@/domains/paper/components/search-page-content";
import { Paper } from "@/domains/paper/types";
import { paperKeys } from "@/lib/react-query/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { q, page } = await searchParams;
  const queryClient = new QueryClient();

  // fetch post information
  await queryClient.ensureQueryData({
    queryKey: paperKeys.list(q?.toString() ?? "", "", page?.toString() ?? "1"),
    queryFn: async () => {
      const paper = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/papers?search=${
          q?.toString() ?? ""
        }&page=${page?.toString() ?? "1"}`
      ).then((res) => res.json() as Promise<Paper[]>);
      return paper;
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
