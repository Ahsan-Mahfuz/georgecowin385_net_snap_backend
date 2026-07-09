import { z } from "zod";

export const createCollectiveDealSchema = z.object({
  owner: z.string().min(1, "Owner is required"),
  company: z.string().trim().min(1, "Company is required"),
  dealName: z.string().trim().min(1, "Deal name is required"),
  contactName: z.string().optional(),
  emailContact: z.string().optional(),
  stage: z.string().optional(),
  amount: z.number().optional(),
  paymentTerm: z.string().optional(),
  customPaymentDays: z.number().optional(),
  monthValues: z.array(z.number()).length(12).optional(),
  xeroOrg: z.string().optional(),
  xeroInvoiceId: z.string().optional(),
  xeroStatus: z.string().optional(),
  notes: z.string().optional(),
});

export const updateCollectiveDealSchema = createCollectiveDealSchema.partial();
