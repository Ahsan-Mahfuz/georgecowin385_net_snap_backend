import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { EmailLeadController } from "./emailLead.controller";
import { createEmailLeadSchema, updateEmailLeadSchema } from "./emailLead.validation";

const router = Router();

router.get("/", auth(), EmailLeadController.getAll);
router.post("/", auth(), validateRequest(createEmailLeadSchema), EmailLeadController.create);
router.patch("/:id", auth(), validateRequest(updateEmailLeadSchema), EmailLeadController.update);
router.delete("/:id", auth(), EmailLeadController.remove);

export const EmailLeadRoutes = router;
