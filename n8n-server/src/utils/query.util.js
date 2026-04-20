const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const buildSearchQuery = (search, fields = []) => {
  if (!search?.trim() || !fields?.length) return null;

  const keyword = search.trim();
  const escapedKeyword = escapeRegExp(keyword);
  const regex = new RegExp(escapedKeyword, "i");

  return {
    $or: fields.map((field) => {
      if (typeof field === "function") {
        return field(regex);
      }

      return {
        [field]: regex,
      };
    }),
  };
};

export const applySearch = (baseQuery = {}, search, fields = []) => {
  const searchQuery = buildSearchQuery(search, fields);

  if (!searchQuery) return baseQuery;

  return {
    ...baseQuery,
    ...searchQuery,
  };
};

export const ARTICLE_SEARCH_FIELDS = [
  // search title block
  (regex) => ({
    blocks: {
      $elemMatch: {
        type: "title",
        text: regex,
      },
    },
  }),
];
