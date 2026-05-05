import { z } from "zod";

export const quoteRequest = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email(),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  description: z.string().min(10),
});