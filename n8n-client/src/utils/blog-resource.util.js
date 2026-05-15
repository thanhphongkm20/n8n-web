import { UI } from "../configs/constants";

export const getTypeColor = (type) => {
  switch (type) {
    case "news":
      return UI.green;
    case "guide":
      return UI.orange;
    case "case_study":
    default:
      return UI.purple;
  }
};

export const getTypeLabel = (type) => {
  switch (type) {
    case "news":
      return "Update News";
    case "guide":
      return "Hướng dẫn";
    case "case_study":
      return "Case Study";
    default:
      return "Blog";
  }
};

export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
