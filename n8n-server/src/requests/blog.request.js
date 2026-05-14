import { z } from "zod";

import {
  BLOG_STATUS,
  BLOG_TYPES,
} from "../configs/enum.js";

export const createBlogRequest = z.object({
  title: z.string().min(1),

  slug: z.string().min(1),

  excerpt: z.string().optional(),

  content: z.string().optional(),

  thumbnail: z.string().optional(),

  type: z.enum([
    BLOG_TYPES.CASE_STUDY,
    BLOG_TYPES.UPDATE_NEWS,
    BLOG_TYPES.TECHNICAL_GUIDE,
  ]),

  tags: z.array(z.string()).optional(),

  seo_title: z.string().optional(),

  seo_description: z.string().optional(),

  status: z.enum([
    BLOG_STATUS.DRAFT,
    BLOG_STATUS.PUBLISHED,
  ]),

  is_featured: z.boolean().optional(),

  published_at: z.string().optional(),
});

export const updateBlogRequest =
  createBlogRequest.partial();