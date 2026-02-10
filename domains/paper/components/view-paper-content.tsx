"use client";
import { Text } from "@/components/ui/text";
import React from "react";
import useGetPaper from "../hooks/use-get-paper";
import { TooltipInfo } from "@/components/ui/tooltip-info";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ViewPaperContent = ({ paperId }: { paperId: string }) => {
  const { data: paper, isPending } = useGetPaper({ id: paperId });
  const { user, isAuthenticated } = useAuthContext();

  if (isPending && !paper) {
    return (
      <div className="flex flex-col gap-6 lg:w-3/5 md:w-4/5 w-full px-6 mx-auto">
        <Text as="p" size={"md"} className="text-center text-muted-foreground">
          Loading paper...
        </Text>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex flex-col gap-6 lg:w-3/5 md:w-4/5 w-full px-6 mx-auto">
        <Text as="p" size={"md"} className="text-center text-muted-foreground">
          Paper not found
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 lg:w-3/5 md:w-4/5 w-full px-6 mx-auto">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <Text
            as="h2"
            size={"2xl"}
            weight={"semibold"}
            className="text-left"
          >
            {paper.title}
          </Text>

          {isAuthenticated && user.id === paper.userId && (
            <Link href={`/paper/${paperId}/edit`} className="self-start">
              <Button
                variant="outline"
                size="sm"
                className="px-4"
              >
                Edit
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-xs h-6 w-6 rounded-full font-medium uppercase text-foreground/80">
              {paper.user.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <Text size={"sm"} className="text-muted-foreground">
            {paper.user.name}
          </Text>
        </div>

        <Text
          size={"sm"}
          className="leading-relaxed text-sm text-foreground/90"
        >
          {paper.abstract}
        </Text>
      </header>

      <section className="flex flex-col gap-3 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <TooltipInfo text="Coming soon">
            <span className="rounded-full border px-2 py-0.5">
              AI Cross-Ref
            </span>
          </TooltipInfo>

          {paper.ipfsCid && (
            <Link
              href={`/api/ipfs/${paper.ipfsCid}`}
              target="_blank"
              className="underline underline-offset-4"
            >
              View PDF
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span>Cite as: desci.ng.1308.2025</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span>
            Uploaded on {format(paper.createdAt ?? new Date(), "PPpp")}
          </span>

          {paper && paper.keywords && paper.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {paper.keywords.map((keyword) => (
                <span
                  key={keyword.id ?? keyword.name}
                  className="rounded-full border px-2 py-0.5 text-[11px]"
                >
                  {keyword.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Text as="p" size={"md"} weight={"semibold"}>
          Notes
        </Text>

        {paper.notes ? (
          <Text as="p" size={"sm"} className="leading-relaxed text-sm">
            {paper.notes}
          </Text>
        ) : (
          <Text
            as="p"
            size={"sm"}
            className="leading-relaxed text-sm text-muted-foreground"
          >
            No notes added yet.
          </Text>
        )}
      </section>
    </div>
  );
};

export default ViewPaperContent;
