import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  description: z.string().trim().min(1, "Description is required"),

  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),

  discount: z.coerce
    .number()
    .min(0, "Discount must be greater than or equal to 0")
    .max(100, "Discount must be less than or equal to 100")
    .default(0),

  status: z.enum(["draft", "published"]).default("draft"),
  category: z.string().trim().default("marketing"),
  badge: z.enum(["hot", "new", "sale", "featured", "none"]).default("hot"),
  featured: z.coerce.boolean().default(false),
  sales_count: z.coerce.number().min(0).default(0),
  node_count: z.coerce.number().min(0).default(0),

  image: z.string().url("Image must be a valid URL").optional(),
  workflow: z.string().url("Workflow must be a valid URL").optional(),
});

export const updateArticleSchema = z.object({
  title: z.string().trim().min(1).optional(),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional(),

  price: z.coerce.number().min(0).optional(),

  discount: z.coerce
    .number()
    .min(0)
    .max(100)
    .optional(),

  status: z.enum(["draft", "published"]).optional(),
  category: z.string().trim().optional(),
  badge: z.enum(["hot", "new", "sale", "featured", "none"]).optional(),
  featured: z.coerce.boolean().optional(),
  sales_count: z.coerce.number().min(0).optional(),
  node_count: z.coerce.number().min(0).optional(),

  image: z.any().optional(),
  workflow: z.any().optional(),
});