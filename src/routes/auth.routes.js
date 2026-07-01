import { Router } from "express";

import {
    register,
    login,
    profile
} from "../controllers/auth.controller.js";

import {
    authenticate
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

router.get(
    "/profile",
    authenticate,
    profile
);

export default router;