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

/**
 * @openapi
 * /parts:
 *   get:
 *     tags:
 *       - Parts
 *     summary: Obtener todos los repuestos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de repuestos.
 */
router.get(
    "/",
    authenticate,
    getParts
);

/**
 * @openapi
 * /parts/{id}:
 *   get:
 *     tags:
 *       - Parts
 *     summary: Obtener repuesto por ID
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
 *         description: Repuesto encontrado.
 */
router.get(
    "/active",
    authenticate,
    getActive
);

/**
 * @openapi
 * /parts:
 *   post:
 *     tags:
 *       - Parts
 *     summary: Registrar repuesto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Repuesto registrado.
 */
router.get(
    "/low-stock",
    authenticate,
    authorize("ADMIN", "MECHANIC"),
    getLowStock
);

/**
 * @openapi
 * /parts/{id}:
 *   put:
 *     tags:
 *       - Parts
 *     summary: Actualizar repuesto
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
 *         description: Repuesto actualizado.
 */
router.get(
    "/category/:category",
    authenticate,
    getPartsByCategory
);

/**
 * @openapi
 * /parts/{id}:
 *   delete:
 *     tags:
 *       - Parts
 *     summary: Eliminar repuesto
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
 *         description: Repuesto eliminado.
 */
router.get(
    "/brand/:brand",
    authenticate,
    getPartsByBrand
);

/**
 * @openapi
 * /parts/{id}:
 *   delete:
 *     tags:
 *       - Parts
 *     summary: Eliminar repuesto
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
 *         description: Repuesto eliminado.
 */
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