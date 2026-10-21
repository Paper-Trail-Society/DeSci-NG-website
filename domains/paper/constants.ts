export const ABSTRACT_PREVIEW_LENGTH = 340;
export const MAX_KEYWORD_LENGTH = 50;

const KEYWORD_SEPARATOR = /[,;\n]+/;

const normalizeKeyword = (keyword: string) => keyword.trim().toLowerCase();

export const parseKeywordInput = (inputValue: string) => {
  const seenKeywords = new Set<string>();

  return inputValue
    .split(KEYWORD_SEPARATOR)
    .map((keyword) => keyword.trim())
    .filter((keyword) => {
      const normalizedKeyword = normalizeKeyword(keyword);

      if (!normalizedKeyword || seenKeywords.has(normalizedKeyword)) {
        return false;
      }

      seenKeywords.add(normalizedKeyword);
      return true;
    });
};

export const findOverlongKeyword = (inputValue: string) =>
  parseKeywordInput(inputValue).find(
    (keyword) => keyword.length > MAX_KEYWORD_LENGTH,
  );

export const getNewKeywords = (
  inputValue: string,
  existingKeywords: readonly string[],
) => {
  const existingKeywordSet = new Set(existingKeywords.map(normalizeKeyword));

  return parseKeywordInput(inputValue).filter(
    (keyword) =>
      keyword.length <= MAX_KEYWORD_LENGTH &&
      !existingKeywordSet.has(normalizeKeyword(keyword)),
  );
};

export const canCreateKeywords = (
  inputValue: string,
  existingKeywords: readonly string[],
) =>
  !findOverlongKeyword(inputValue) &&
  getNewKeywords(inputValue, existingKeywords).length > 0;
