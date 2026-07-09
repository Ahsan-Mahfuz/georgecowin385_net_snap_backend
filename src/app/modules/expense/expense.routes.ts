import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { ExpenseController } from "./expense.controller";
import { createExpenseSchema, updateExpenseSchema } from "./expense.validation";

const router = Router();

router.get("/", auth(), ExpenseController.getAll);
router.post("/", auth(), validateRequest(createExpenseSchema), ExpenseController.create);
router.patch("/:id", auth(), validateRequest(updateExpenseSchema), ExpenseController.update);
router.delete("/:id", auth(), ExpenseController.remove);

export const ExpenseRoutes = router;
