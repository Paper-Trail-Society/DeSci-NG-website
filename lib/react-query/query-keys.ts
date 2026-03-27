export const paperKeys = {
  all: ["papers"] as const,
  lists: () => [...paperKeys.all, "list"] as const,
  list: (...filters: string[]) =>
    [...paperKeys.all, "list", { ...filters }] as const,
  details: () => [...paperKeys.all, "detail"] as const,
  detail: (id: string) => [...paperKeys.details(), id] as const,
};

export const paperCommentKeys = {
  root: (paperId: number | string) =>
    [...paperKeys.detail(String(paperId)), "comments"] as const,
  list: (paperId: number | string, sortDir: string) =>
    [...paperCommentKeys.root(paperId), { sortDir }] as const,
  replies: (
    paperId: number | string,
    parentCommentId: number,
    sortDir: string,
  ) =>
    [
      ...paperCommentKeys.root(paperId),
      "replies",
      parentCommentId,
      { sortDir },
    ] as const,
};
