import * as Yup from "yup";

import LANGUAGE from "../utils/language.util";

export const resourceValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must not exceed 150 characters")
    .required(LANGUAGE.FIELD_REQUIRED("Resource title")),

  slug: Yup.string()
    .trim()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and use hyphens only",
    )
    .required(LANGUAGE.FIELD_REQUIRED("Slug")),

  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .required(LANGUAGE.FIELD_REQUIRED("Resource description")),

  content: Yup.string().trim().nullable(),

  resource_type: Yup.string()
    .oneOf(
      [
        "documentation",
        "tool_script",
        "community",
        "tutorial",
        "template",
      ],
      "Invalid resource type",
    )
    .required(LANGUAGE.FIELD_REQUIRED("Resource type")),

  thumbnail_url: Yup.string()
    .trim()
    .url("Thumbnail URL must be a valid URL")
    .nullable()
    .notRequired(),

  tags: Yup.array().of(Yup.string().trim()).max(10, "Maximum 10 tags allowed"),

  download_url: Yup.string()
    .trim()
    .url("Download URL must be valid")
    .nullable()
    .notRequired(),

  external_url: Yup.string()
    .trim()
    .url("External URL must be valid")
    .nullable()
    .notRequired(),

  status: Yup.string()
    .oneOf(["draft", "published"], "Invalid status")
    .required(LANGUAGE.FIELD_REQUIRED("Status")),

  is_featured: Yup.boolean(),
  allow_comments: Yup.boolean(),
  notify_subscribers: Yup.boolean(),
});

export default resourceValidationSchema;