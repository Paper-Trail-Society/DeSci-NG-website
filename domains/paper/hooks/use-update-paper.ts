import { $http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

type UpdatePaperPayload = {
  paperId: string;
  title: string;
  abstract: string;
  categoryId: number;
  fieldId: number;
  addedKeywords: number[];
  removedKeywords: number[];
  newKeywords?: string[];
  notes?: string | null;
};

const useUpdatePaper = () => {
  return useMutation({
    mutationFn: async ({
      paperId,
      title,
      abstract,
      categoryId,
      fieldId,
      addedKeywords,
      removedKeywords,
      newKeywords,
      notes,
    }: UpdatePaperPayload) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("abstract", abstract);
      formData.append("categoryId", categoryId.toString());
      formData.append("fieldId", fieldId.toString());

      addedKeywords.forEach((keywordId, idx) => {
        formData.append(`addedKeywords[${idx}]`, keywordId.toString());
      });

      removedKeywords.forEach((keywordId, idx) => {
        formData.append(`removedKeywords[${idx}]`, keywordId.toString());
      });

      newKeywords?.forEach((keyword, idx) => {
        formData.append(`newKeywords[${idx}]`, keyword);
      });

      if (typeof notes === "string" && notes.trim().length > 0) {
        formData.append("notes", notes);
      }

      return $http.put(`/papers/${paperId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};

export default useUpdatePaper;
