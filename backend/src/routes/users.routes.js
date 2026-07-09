import { Router } from "express";

import {
    getUsers,
    getUser
} from "../controllers/user.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getUsers);

router.get("/:id", authenticate, getUser);

export default router;