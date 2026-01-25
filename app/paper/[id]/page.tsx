import PaperSearchInput from "@/components/shared/paper-search-input";
import ViewPaperContent from "@/domains/paper/components/view-paper-content";
import { Paper } from "@/domains/paper/types";
import { authClient } from "@/lib/auth-client";
import { paperKeys } from "@/lib/react-query/query-keys";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const paperId = (await params).id;

  // fetch post information
  const paper = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/papers/${paperId}`
  ).then((res) => res.json() as Promise<Paper>);

  return {
    title: paper.title,
    description: paper.abstract,
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData({
    queryKey: paperKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/papers/${id}`,
        {
          headers: {
            // forward cookies for auth. Better auth uses cookies to manage sessions
            cookie: (await headers()).get("cookie") || "",
          },
          cache: "no-store",
          credentials: "include", // include cookies in the request
          }
      )

      if (res.ok === false) {
        redirect("/404");
      } 
      
      const paper = (await res.json()) as Paper;

      return paper;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="items-center justify-items-center  pt-10 pb-20 w-full">
          <section className="flex flex-col gap-14 items-center pt-10 pb-20 w-full">
            <div className="space-y-4 lg:w-3/5 md:w-4/5 w-full px-8">
              <PaperSearchInput className="w-full" />
            </div>

            <ViewPaperContent paperId={id} />
          </section>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
