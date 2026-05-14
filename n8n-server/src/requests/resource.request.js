import { z } from "zod";
import { RESOURCE_STATUS, RESOURCE_TYPES } from "../configs/enum.js";

export const createResourceRequest = z.object({
  title: z.string().min(1, "Title is required"),

  slug: z.string().min(1, "Slug is required"),

  description: z.string().optional(),

  content: z.string().optional(),

  type: z.enum([
    RESOURCE_TYPES.DOCUMENTATION,
    RESOURCE_TYPES.TOOL_SCRIPT,
    RESOURCE_TYPES.COMMUNITY,
  ]),

  thumbnail: z.string().optional(),

  tags: z.array(z.string()).optional(),

  download_url: z.string().optional(),

  external_url: z.string().optional(),

  status: z.enum([
    RESOURCE_STATUS.DRAFT,
    RESOURCE_STATUS.PUBLISHED,
  ]),

  is_featured: z.boolean().optional(),
});

export const updateResourceRequest =
  createResourceRequest.partial();