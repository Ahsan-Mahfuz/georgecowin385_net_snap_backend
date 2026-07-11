import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { ProductionRequestController } from "./productionRequest.controller";
import {
  createProductionRequestSchema,
  updateProductionRequestSchema,
} from "./productionRequest.validation";

const router = Router();

router.get("/", auth(), ProductionRequestController.getAll);
router.post("/", auth(), validateRequest(createProductionRequestSchema), ProductionRequestController.create);
// Only production / admin / operations action a request (schedule, complete, reject).
router.patch(
  "/:id",
  auth("admin", "operations", "production"),
  validateRequest(updateProductionRequestSchema),
  ProductionRequestController.update,
);
router.delete("/:id", auth("admin", "operations", "production"), ProductionRequestController.remove);

export const ProductionRequestRoutes = router;
