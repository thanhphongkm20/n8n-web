import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(255),

  description: z.string(),

  price: z.coerce.number().min(0),

  image: z.union([z.string().url(), z.literal(""), z.null()]).optional(),

  status: z.enum(["draft", "published"]).default("draft"),
});

export const updateArticleSchema = z.object({
  title: z.string().trim().min(3).max(255).optional(),

  description: z.string().optional(),

  price: z.coerce.number().min(0).optional(),

  image: z.union([z.string().url(), z.literal(""), z.null()]).optional(),

  status: z.enum(["draft", "published"]).default("draft"),
});
