import { z } from "zod";

export const createTalentSchema = z.object({
  name: z.string().trim().min(1, "Talent name is required"),
  manager: z.string().min(1, "Manager is required"),
});

export const updateTalentSchema = createTalentSchema.partial();
