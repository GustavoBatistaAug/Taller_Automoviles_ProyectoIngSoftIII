import { Router } from "express";
import {
    getVehicles,
    getVehicle,
    createVehicles,
    updateVehicles,
    remove
} from "../controllers/vehicle.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "../validators/vehicle.validator.js";

const router = Router();
router.get("/", authenticate, getVehicles);
router.get("/:id", authenticate, getVehicle);
router.post(
    "/",
    authenticate,
    validate(createVehicleSchema),
    createVehicles
);
router.put(
    "/:id",
    authenticate,
    validate(updateVehicleSchema),
    updateVehicles
);
router.delete("/:id", authenticate, remove);

export default router;