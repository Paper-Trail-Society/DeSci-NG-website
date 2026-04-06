import { PaginatedPapersResponse } from "@/domains/paper/types";
import { PublicProfile } from "../types";

const EMPTY_PAPERS: PaginatedPapersResponse = {
  data: [],
  next_page: null,
  prev_page: null,
  total: 0,
  size: 10,
};

const normalizePapers = (payload: unknown): PaginatedPapersResponse => {
  if (!payload || typeof payload !== "object") return EMPTY_PAPERS;

  const record = payload as Record<string, unknown>;
  const data = Array.isArray(record.data) ? record.data : [];

  return {
    data: data as PaginatedPapersResponse["data"],
    next_page: typeof record.next_page === "string" ? record.next_page : null,
    prev_page: typeof record.prev_page === "string" ? record.prev_page : null,
    total: typeof record.total === "number" ? record.total : data.length,
    size: typeof record.size === "number" ? record.size : data.length || 10,
  };
};

export const getPublicProfileById = async (
  userId: string,
): Promise<PublicProfile | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiUrl}/profile/${encodeURIComponent(userId)}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const json = (await response.json());
    return json;
  } catch {
    return null;
  }
};

export const getPublishedPapersByUserId = async (
  userId: string,
  page: number,
): Promise<PaginatedPapersResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return EMPTY_PAPERS;
  }

  const params = new URLSearchParams({
    userId,
    status: "published",
    page: String(page),
  });

  try {
    const response = await fetch(`${apiUrl}/papers?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return EMPTY_PAPERS;
    }

    const json = (await response.json()) as unknown;
    return normalizePapers(json);
  } catch {
    return EMPTY_PAPERS;
  }
};

export const getInstitutionLabel = (profile: PublicProfile): string => {
  if (profile.institution?.name) return profile.institution.name;
  return "No institution provided";
};
