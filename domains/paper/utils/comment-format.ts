import { PaperComment } from "../hooks/use-paper-comments";

export const getCommentEditText = (comment: PaperComment) => {
  return comment.bodyMarkdown;
};

export const getCommentDisplayHtml = (comment: PaperComment) => {
  return comment.bodyHtml;
};

