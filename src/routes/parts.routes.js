import { Router } from "express";

import {
    getParts,
    getPart,
    getPartsByCategory,
    getPartsByBrand,
    getActive,
    getLowStock,
    createPart,
    updatePart,
    deletePart
} from "../controllers/parts.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
    createPartSchema,
    updatePartSchema
} from "../validators/parts.validator.js";

const router = Router();

router.get(
    "/",
    authenticate,
    getParts
);

router.get(
    "/active",
    authenticate,
    getActive
);

router.get(
    "/low-stock",
    authenticate,
    authorize("ADMIN", "EMPLOYEE"),
    getLowStock
);

router.get(
    "/category/:category",
    authenticate,
    getPartsByCategory
);

router.get(
    "/brand/:brand",
    authenticate,
    getPartsByBrand
);

router.get(
    "/:id",
    authenticate,
    getPart
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "EMPLOYEE"),
    validate(createPartSchema),
    createPart
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "EMPLOYEE"),
    validate(updatePartSchema),
    updatePart
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deletePart
);

export default router;