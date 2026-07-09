import { Router } from "express";
import { auth, adminAuth } from "../../middleware/auth";
import { SettingsController } from "./settings.controller";

const router = Router();

router.get("/", auth(), SettingsController.getSettings);
router.patch("/", adminAuth, SettingsController.updateSettings);

export const SettingsRoutes = router;
