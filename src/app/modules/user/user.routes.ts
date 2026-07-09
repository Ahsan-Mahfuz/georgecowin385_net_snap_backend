import { Router } from "express";
import { auth, adminAuth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { approveUserSchema, setRoleSchema, setStatusSchema } from "./user.validation";

const router = Router();

// Active team list — any logged-in user (used for manager/owner dropdowns).
router.get("/team", auth(), UserController.getTeam);

// All user-administration routes are restricted to admin + operations.
router.get("/", adminAuth, UserController.getUsers);
router.patch("/:id/approve", adminAuth, validateRequest(approveUserSchema), UserController.approveUser);
router.patch("/:id/reject", adminAuth, UserController.rejectUser);
router.patch("/:id/status", adminAuth, validateRequest(setStatusSchema), UserController.setStatus);
router.patch("/:id/role", adminAuth, validateRequest(setRoleSchema), UserController.setRole);

export const UserRoutes = router;
