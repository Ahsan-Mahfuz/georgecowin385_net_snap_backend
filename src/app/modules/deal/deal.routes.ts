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

export const DealRoutes = router;
