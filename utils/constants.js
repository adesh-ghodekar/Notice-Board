// Single source of truth for notice enums and UI option lists.
// Keep these in sync with the `Category` / `Priority` enums in prisma/schema.prisma.

export const CATEGORY_OPTIONS = ["GENERAL", "EVENT", "EXAM"];

export const PRIORITY_OPTIONS = ["NORMAL", "URGENT"];

export const SORT_OPTIONS = [
  { value: "NEWEST", label: "Newest First" },
  { value: "OLDEST", label: "Oldest First" },
  { value: "TITLE_ASC", label: "Title (A-Z)" },
  { value: "TITLE_DESC", label: "Title (Z-A)" },
];

export const NOTICES_PER_PAGE = 5;

export const EMPTY_NOTICE_FORM = {
  title: "",
  body: "",
  category: "GENERAL",
  priority: "NORMAL",
  publishDate: "",
  image: "",
};
