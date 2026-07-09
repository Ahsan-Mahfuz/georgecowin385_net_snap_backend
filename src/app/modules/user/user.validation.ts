import { z } from "zod";
import { ROLES, ACCOUNT_STATUSES } from "../../utilities/enum";

export const approveUserSchema = z.object({
  role: z.enum(ROLES),
});

export const setRoleSchema = z.object({
  role: z.enum(ROLES),
});

export const setStatusSchema = z.object({
  status: z.enum(ACCOUNT_STATUSES),
});
