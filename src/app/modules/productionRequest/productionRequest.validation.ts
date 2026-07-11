import { z } from "zod";
import { PRODUCTION_REQUEST_STATUSES } from "../../utilities/enum";

const itemSchema = z.object({
  name: z.string().trim().min(1),
  days: z.number().optional(),
  rate: z.number().optional(),
});

export const createProductionRequestSchema = z.object({
  manager: z.string().min(1, "Manager is required"),
  talentName: z.string().trim().min(1, "Talent is required"),
  shootDate: z.string().optional(),
  videoBrief: z.string().optional(),
  items: z.array(itemSchema).optional(),
  total: z.number().optional(),
  note: z.string().optional(),
});

export const updateProductionRequestSchema = z.object({
  status: z.enum(PRODUCTION_REQUEST_STATUSES).optional(),
  note: z.string().optional(),
});
