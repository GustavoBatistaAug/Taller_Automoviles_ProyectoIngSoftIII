import { validate } from "../middlewares/validation.middleware.js"
import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { loginSchema, registerUserSchema } from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/register",
    validate(registerUserSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.get(
    "/profile",
    authenticate,
    profile
);

export default router;