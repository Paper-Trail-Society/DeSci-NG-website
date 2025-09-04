export type Paper = {
  id: number;
  title: string;
  abstract: string;
  notes: string | null;
  ipfsCid: string;
  ipfsUrl: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  keywords: string[];

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
