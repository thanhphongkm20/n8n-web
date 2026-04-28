import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, "Article title is required"),

  description: z.string().min(1, "Article description is required"),

  price: z.coerce.number().min(1, "Price must be greater than 0"),

  slug: z.string().min(1, "Slug is required"),

  status: z.enum(["draft", "published"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export const updateArticleSchema = z.object({
  title: z.string().trim().min(3).max(255).optional(),

  description: z.string().optional(),

  price: z.coerce.number().min(0).optional(),

  image: z.any().optional(),

  status: z.enum(["draft", "published"]).default("draft"),

  slug: z.string().optional(),
});
