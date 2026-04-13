"use client";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import PaperCard from "@/domains/paper/components/paper-card";
import { PaginatedPapersResponse } from "@/domains/paper/types";
import ProfilePapersPagination from "./profile-papers-pagination";

interface ProfilePublishedPapersSectionProps {
  papers: PaginatedPapersResponse;
  currentPage: number;
}

const ProfilePublishedPapersSection = ({
  papers,
  currentPage,
}: ProfilePublishedPapersSectionProps) => {
  const totalPages = Math.max(
    1,
    Math.ceil(papers.total / Math.max(1, papers.size)),
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <Text
          as="h2"
          size={"xl"}
          weight={"semibold"}
          className="profile-title"
        >
          Published papers
        </Text>
        <Text size={"sm"} className="profile-subtitle">
          {papers.total} paper{papers.total === 1 ? "" : "s"}
        </Text>
      </div>

      {papers.data.length > 0 ? (
        <div className="space-y-4">
          {papers.data.map((paper) => (
            <PaperCard key={paper.id} {...paper} />
          ))}
          <ProfilePapersPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      ) : (
        <Card className="profile-card p-6">
          <Text size={"sm"} className="profile-subtitle">
            No published papers yet.
          </Text>
        </Card>
      )}
    </section>
  );
};

export default ProfilePublishedPapersSection;
