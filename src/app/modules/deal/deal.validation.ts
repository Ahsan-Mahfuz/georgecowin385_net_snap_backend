import { z } from "zod";
import { DEAL_STATUSES } from "../../utilities/enum";

export const createDealSchema = z.object({
  manager: z.string().min(1, "Manager is required"),
  talentName: z.string().trim().min(1, "Talent name is required"),
  status: z.enum(DEAL_STATUSES).optional(),
  campaignName: z.string().optional(),
  company: z.string().optional(),
  stage: z.string().optional(),
  monthValues: z.array(z.number()).length(12).optional(),
  costRate: z.number().optional(),
});

export const updateDealSchema = createDealSchema.partial();
