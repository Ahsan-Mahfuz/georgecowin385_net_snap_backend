import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { DealController } from "./deal.controller";
import { createDealSchema, updateDealSchema } from "./deal.validation";

const router = Router();

router.get("/", auth(), DealController.getDeals);
router.post("/", auth(), validateRequest(createDealSchema), DealController.createDeal);
router.get("/:id", auth(), DealController.getDealById);
router.patch("/:id", auth(), validateRequest(updateDealSchema), DealController.updateDeal);
router.delete("/:id", auth(), DealController.deleteDeal);

// Xero invoicing (finance/admin/operations)
router.post("/:id/xero-invoice", auth("admin", "finance", "operations"), DealController.createInvoice);
router.post("/:id/mark-invoiced", auth("admin", "finance", "operations"), DealController.markInvoiced);
router.post("/:id/mark-paid", auth("admin", "finance", "operations"), DealController.markPaid);

// Talent remittance (finance/admin/operations)
router.post("/:id/send-remittance", auth("admin", "finance", "operations"), DealController.sendRemittance);
router.post("/:id/mark-talent-paid", auth("admin", "finance", "operations"), DealController.markTalentPaid);

export const DealRoutes = router;
