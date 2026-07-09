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

/**
 * @openapi
 * /vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Obtener todos los vehículos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos.
 */
router.get("/", authenticate, getVehicles);

/**
 * @openapi
 * /vehicles/{id}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Obtener vehículo por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo encontrado.
 *       404:
 *         description: Vehículo no encontrado.
 */
router.get("/:id", authenticate, getVehicle);

/**
 * @openapi
 * /vehicles:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Registrar vehículo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Vehículo registrado.
 */
router.post(
    "/",
    authenticate,
    validate(createVehicleSchema),
    createVehicles
);

/**
 * @openapi
 * /vehicles/{id}:
 *   put:
 *     tags:
 *       - Vehicles
 *     summary: Actualizar vehículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo actualizado.
 */
router.put(
    "/:id",
    authenticate,
    validate(updateVehicleSchema),
    updateVehicles
);

/**
 * @openapi
 * /vehicles/{id}:
 *   delete:
 *     tags:
 *       - Vehicles
 *     summary: Eliminar vehículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo eliminado.
 */
router.delete("/:id", authenticate, remove);

export default router;