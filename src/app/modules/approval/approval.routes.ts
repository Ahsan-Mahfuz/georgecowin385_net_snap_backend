import { Router } from "express";
import { auth, adminAuth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { ApprovalController } from "./approval.controller";
import { createApprovalSchema, rejectApprovalSchema } from "./approval.validation";

const router = Router();

router.get("/", auth(), ApprovalController.getAll);
router.post("/", auth(), validateRequest(createApprovalSchema), ApprovalController.create);
router.patch("/:id/approve", adminAuth, ApprovalController.approve);
router.patch("/:id/reject", adminAuth, validateRequest(rejectApprovalSchema), ApprovalController.reject);

export const ApprovalRoutes = router;
