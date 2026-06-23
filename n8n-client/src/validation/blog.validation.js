import * as Yup from "yup";

import LANGUAGE from "../utils/language.util";
import { FILTERS } from "../configs/constants";

const BLOG_TYPES = FILTERS.map((item) => item.value).filter(Boolean);

export const blogValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters")
    .required(LANGUAGE.FIELD_REQUIRED("Blog title")),

  slug: Yup.string()
    .trim()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and use hyphens only",
    )
    .required(LANGUAGE.FIELD_REQUIRED("Slug")),

  excerpt: Yup.string()
    .trim()
    .min(20, "Excerpt must be at least 20 characters")
    .max(300, "Excerpt must not exceed 300 characters")
    .required(LANGUAGE.FIELD_REQUIRED("Blog excerpt")),

  content: Yup.string()
    .trim()
    .min(50, "Content must be at least 50 characters")
    .required(LANGUAGE.FIELD_REQUIRED("Blog content")),

  thumbnail: Yup.string()
    .trim()
    .test(
      "thumbnail-format",
      "Thumbnail must be a valid URL or image file",
      (value) => {
        if (!value) return true;

        const isUrl = /^https?:\/\/.+/.test(value);

        const isBase64Image = /^data:image\/(png|jpg|jpeg|webp);base64,/.test(
          value,
        );

        return isUrl || isBase64Image;
      },
    )
    .nullable()
    .notRequired(),

  type: Yup.string()
    .oneOf(
      FILTERS.map((item) => item.value).filter(Boolean),
      "Invalid blog type",
    )
    .required(LANGUAGE.FIELD_REQUIRED("Blog type")),

  tags: Yup.array().of(Yup.string().trim()).max(10, "Maximum 10 tags allowed"),

  seo_title: Yup.string().trim(),

  seo_description: Yup.string().trim(),

  status: Yup.string()
    .oneOf(["draft", "published"], "Invalid status")
    .required(LANGUAGE.FIELD_REQUIRED("Status")),

  is_featured: Yup.boolean(),

  published_at: Yup.date().nullable(),
});

export default blogValidationSchema;