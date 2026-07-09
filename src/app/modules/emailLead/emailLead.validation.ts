import { z } from "zod";
import { LEAD_CATEGORIES } from "./emailLead.interface";

export const createEmailLeadSchema = z.object({
  manager: z.string().min(1, "Manager is required"),
  category: z.enum(LEAD_CATEGORIES),
  from: z.string().optional(),
  subject: z.string().optional(),
  talentName: z.string().optional(),
  company: z.string().optional(),
  campaignName: z.string().optional(),
  amount: z.number().optional(),
  monthIndex: z.number().optional(),
  paymentTerm: z.string().optional(),
  contactEmail: z.string().optional(),
  eventDate: z.string().optional(),
  actionPoint: z.string().optional(),
  body: z.string().optional(),
});

export const updateEmailLeadSchema = createEmailLeadSchema.partial();
