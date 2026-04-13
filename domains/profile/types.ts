import { PaginatedPapersResponse } from "@/domains/paper/types";

export type PublicProfile = {
  id: string;
  name: string;
  emailVerified: boolean;
  institution: {
    id: number;
    name: string;
  } | null;
  areasOfInterest: string[] | null;
  createdAt: Date;
};

export type PublicProfilePageData = {
  profile: PublicProfile | null;
  papers: PaginatedPapersResponse;
};
