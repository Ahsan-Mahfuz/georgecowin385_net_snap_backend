import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { signupSchema, loginSchema, changePasswordSchema } from "./auth.validation";

const router = Router();

router.post("/signup", validateRequest(signupSchema), AuthController.signUp);
router.post("/login", validateRequest(loginSchema), AuthController.signIn);
router.get("/me", auth(), AuthController.getMe);
router.post(
  "/change-password",
  auth(),
  validateRequest(changePasswordSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
