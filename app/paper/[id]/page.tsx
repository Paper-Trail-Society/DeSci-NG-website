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
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchPaperById(paperId: string): Promise<Paper | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/papers/${paperId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Paper;
  } catch (err) {
    console.error("fetchPaperById error:", err);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const paperId = (await params).id;
  const paper = await fetchPaperById(paperId);
  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/paper/${paperId}`;

  return {
    title: paper?.title ?? 'Paper',
    description: paper?.abstract ?? '',
    openGraph: {
      title: paper?.title,
      description: paper?.abstract,
      url: canonical,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: paper?.title,
      description: paper?.abstract,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
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

  const paper = queryClient.getQueryData(paperKeys.detail(id)) as Paper | undefined;

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
