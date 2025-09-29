export type Paper = {
  id: number;
  title: string;
  slug: string | null;
  abstract: string;
  notes: string | null;
  ipfsCid: string;
  ipfsUrl: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;

  keywords: {
    id: number;
    name: string;
    aliases: string[];
  }[];

  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type PaginatedPapersResponse = {
  data: Paper[];
  next_page: string | null;
  prev_page: string | null;
  total: number;
  size: number;
};

export type Keyword = {
  id: number;
  name: string;
  aliases: string[];
};
