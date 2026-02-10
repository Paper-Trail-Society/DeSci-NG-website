import PaperSearchInput from "@/components/shared/paper-search-input";
import ViewPaperContent from "@/domains/paper/components/view-paper-content";
import { Paper } from "@/domains/paper/types";
import { paperKeys } from "@/lib/react-query/query-keys";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const paperId = params.id;

  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const headers: Record<string, string> = {};
  if (cookieHeader) {
    headers["cookie"] = cookieHeader;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/papers/${paperId}`,
      {
        headers,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        title: "Paper | Nubian research",
        description: "View research papers published on nubianresearch.com",
      };
    }

    const paper = (await response.json()) as Paper;

    return {
      title: paper.title,
      description: paper.abstract,
    };
  } catch {
    return {
      title: "Paper | Nubian research",
      description: "View research papers published on nubianresearch.com",
    };
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData({
    queryKey: paperKeys.detail(id),
    queryFn: async () => {
      const cookieStore = cookies();
      const cookieHeader = (await cookieStore).getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

      const headers: Record<string, string> = {};
      if (cookieHeader) {
        headers["cookie"] = cookieHeader;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/papers/${id}`,
        {
          headers,
          cache: "no-store",
        },
      );
      let paper = null;
      if (res.ok) {
        paper = (await res.json()) as Paper;
      }

      return paper;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="items-center justify-items-center py-10 w-full">
          <section className="flex flex-col gap-14 items-center pt-10 w-full">
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
