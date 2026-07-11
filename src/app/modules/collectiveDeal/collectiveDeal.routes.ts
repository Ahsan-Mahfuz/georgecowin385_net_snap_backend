import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { CollectiveDealController } from "./collectiveDeal.controller";
import {
  createCollectiveDealSchema,
  updateCollectiveDealSchema,
} from "./collectiveDeal.validation";

const router = Router();

router.get("/", auth(), CollectiveDealController.getDeals);
router.post(
  "/",
  auth(),
  validateRequest(createCollectiveDealSchema),
  CollectiveDealController.createDeal,
);
router.post("/:id/xero-invoice", auth(), CollectiveDealController.createInvoice);
router.post("/:id/mark-invoiced", auth(), CollectiveDealController.markInvoiced);
router.post("/:id/mark-paid", auth(), CollectiveDealController.markPaid);
router.get("/:id", auth(), CollectiveDealController.getDealById);
router.patch(
  "/:id",
  auth(),
  validateRequest(updateCollectiveDealSchema),
  CollectiveDealController.updateDeal,
);
router.delete("/:id", auth(), CollectiveDealController.deleteDeal);

export const CollectiveDealRoutes = router;
