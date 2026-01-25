export type Paper = {
  id: number;
  title: string;
  slug: string;
  status: "pending" | "published" | "rejected";
  abstract: string;
  notes: string | null;
  ipfsCid: string;
  ipfsUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  fieldId?: number;
  category: {
    id: number;
    name: string;
    fieldId: number
  };
  field: {
    id: number;
    name: string
  }
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
