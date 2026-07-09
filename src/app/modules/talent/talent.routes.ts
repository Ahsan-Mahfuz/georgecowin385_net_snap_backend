import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { TalentController } from "./talent.controller";
import { createTalentSchema, updateTalentSchema } from "./talent.validation";

const router = Router();

router.get("/", auth(), TalentController.getAll);
router.post("/", auth(), validateRequest(createTalentSchema), TalentController.create);
router.patch("/:id", auth(), validateRequest(updateTalentSchema), TalentController.update);
router.delete("/:id", auth(), TalentController.remove);

export const TalentRoutes = router;
