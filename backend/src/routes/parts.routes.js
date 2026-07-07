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
    deletePart,
    stockIn,
    stockOut
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
    authorize("ADMIN", "MECHANIC"),
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
    authorize("ADMIN", "MECHANIC"),
    validate(createPartSchema),
    createPart
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "MECHANIC"),
    validate(updatePartSchema),
    updatePart
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deletePart
);

router.patch(
    "/:id/stock-in",
    authenticate,
    authorize("ADMIN", "MECHANIC"),
    stockIn
);

router.patch(
    "/:id/stock-out",
    authenticate,
    authorize("ADMIN", "MECHANIC"),
    stockOut
);

export default router;