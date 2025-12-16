"use client";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import useGetPaper from "../hooks/use-get-paper";
import { TooltipInfo } from "@/components/ui/tooltip-info";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";

const ViewPaperContent = ({ paperId }: { paperId: string }) => {
  const { data: paper, isPending } = useGetPaper({ id: paperId });
  const { user, isAuthenticated } = useAuthContext();

  if (isPending && !paper) {
    return (
      <div className="flex flex-col gap-10 lg:w-3/5 md:w-4/5 w-full px-8 mx-auto">
        <Text as="p" size={"md"} className="text-center w-full mx-auto">
          Loading paper...
        </Text>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex flex-col gap-10 lg:w-3/5 md:w-4/5 w-full px-8 mx-auto">
        <Text as="p" size={"md"} className="text-center w-full mx-auto">
          Paper not found
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 lg:w-3/5 md:w-4/5 w-full px-8 mx-auto">
      <div className="flex flex-col gap-4 text-left md:text-center">
        <div className="flex justify-between items-center">
          <Text size={"2xl"} weight={"semibold"}>
            {paper.title}
          </Text>

          {isAuthenticated && user.id === paper.userId && (
            <Button variant={"outline"} size={"sm"}>
              <Link href={`/paper/${paperId}/edit`}>Edit</Link>
            </Button>
          )}
        </div>

        <Text size={"md"}>{paper.user.name}</Text>

        <Text size={"sm"} className="leading-6 duration-300 transition-all ease-in-out">
          {paper.abstract}
        </Text>
      </div>

      <section className="md:w-2/3 w-full mx-auto flex flex-col gap-3">
        <div>
          <div className="flex flex-wrap justify-between gap-4 text-xs">
            <p className="flex gap-2">
              <TooltipInfo text="Coming soon">
                <Text size={"xs"}>[AI Cross-Ref]</Text>
              </TooltipInfo>

              <Link
                href={paper?.ipfsCid ? `/api/ipfs/${paper?.ipfsCid}` : "#"}
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
              [Uploaded on {format(paper.createdAt ?? new Date(), "PPpp")}]
            </Text>

            {/* TODO: Add an hyperlink to the rendered tags that links to the search page and adds a tag as a query */}
            {paper && paper.keywords.length > 0 && (
              <Text size={"xs"}>
                [{paper.keywords.map((keyword) => keyword.name).join(", ")}]
              </Text>
            )}
          </p>
        </div>
      </section>

      <section>
        <Text as="p" size={"md"} weight={"semibold"}>
          Notes
        </Text>

        <Text as="p" size={"sm"} className="leading-6">
          {paper.notes}
        </Text>
      </section>
    </div>
  );
};

export default ViewPaperContent;
