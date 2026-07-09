import { Router } from "express";
import { auth, adminAuth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { OverheadController } from "./overhead.controller";
import { createOverheadSchema, updateOverheadSchema } from "./overhead.validation";

const router = Router();

router.get("/", auth(), OverheadController.getAll);
router.post("/", adminAuth, validateRequest(createOverheadSchema), OverheadController.create);
router.patch("/:id", adminAuth, validateRequest(updateOverheadSchema), OverheadController.update);
router.delete("/:id", adminAuth, OverheadController.remove);

export const OverheadRoutes = router;
