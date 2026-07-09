import { z } from "zod";

export const createOverheadSchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  values: z.array(z.number()).length(12).optional(),
});

export const updateOverheadSchema = createOverheadSchema.partial();
