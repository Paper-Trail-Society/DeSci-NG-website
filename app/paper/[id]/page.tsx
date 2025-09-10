"use client";
import PaperSearchInput from "@/components/shared/paper-search-input";
import PublicNav from "@/components/shared/public-nav";
import { Text } from "@/components/ui/text";
import { TooltipInfo } from "@/components/ui/tooltip-info";
import useGetPaper from "@/domains/paper/hooks/use-get-paper";
import { format } from "date-fns";
import Link from "next/link";

// TODO: Make this a server component and prefetch the paper data on the server

const Page = ({ params }: { params: { id: string } }) => {
  const { data: paper } = useGetPaper({ id: params.id });
  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center  pt-10 pb-20 w-full">
        <section className="flex flex-col gap-14 items-center pt-10 pb-20 w-full">
          <div className="space-y-4 w-2/5">
            <PaperSearchInput className="w-full" />
          </div>

          <div className="flex flex-col gap-10 w-3/5 mx-auto">
            <div className="flex flex-col gap-4 text-center">
              <Text size={"2xl"} weight={"semibold"}>
                {paper?.title}
              </Text>
              <Text size={"md"}>{paper?.user.name}</Text>

              <Text>{paper?.abstract}</Text>
            </div>

            <section className="w-2/3 mx-auto flex flex-col gap-3">
              <div>
                <div className="flex flex-wrap justify-between gap-4 text-xs">
                  <p className="flex gap-2">
                    <TooltipInfo text="Coming soon">
                      <Text size={"xs"}>[AI Cross-Ref]</Text>
                    </TooltipInfo>

                    <Link
                      href={paper?.ipfsUrl ?? "#"}
                      target="_blank"
                      className="hover:underline font-semibold"
                    >
                      [View PDF]
                    </Link>
                  </p>

                  <Text size={"xs"}>[Cite as: desci.ng.1308.2025]</Text>
                </div>
              </div>
              <div>
                <p className="flex flex-wrap justify-between gap-4 text-xs">
                  <Text size={"xs"}>
                    [Uploaded on{" "}
                    {format(paper?.createdAt ?? new Date(), "PPpp")}]
                  </Text>

                  {/* TODO: Add an hyperlink to the rendered tags that links to the search page and adds a tag as a query */}
                  {paper && paper.keywords.length > 0 && (
                    <Text size={"xs"}>
                      [
                      {paper.keywords
                        .map((keyword) => keyword.name)
                        .join(", ")}
                      ]
                    </Text>
                  )}
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
