import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js"
import { getServices, getService, setService, editService, removeService } from "../controllers/serviceRequest.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createServiceRequestSchema, updateServiceRequestSchema } from "../validators/serviceRequest.validator.js";

const router = Router();

/**
 * @openapi
 * /service-request:
 *   get:
 *     tags:
 *       - ServiceRequest
 *     summary: Obtener todas las solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes.
 */
router.get("/", authenticate, getServices);

/**
 * @openapi
 * /service-request/{id}:
 *   get:
 *     tags:
 *       - ServiceRequest
 *     summary: Obtener solicitud por ID
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
 *         description: Solicitud encontrada.
 */
router.get("/:id", authenticate, getService);

/**
/**
 * @openapi
 * /service-request:
 *   post:
 *     tags:
 *       - ServiceRequest
 *     summary: Registrar solicitud de servicio
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Solicitud creada.
 */
router.post("/", authenticate, validate(createServiceRequestSchema), setService);

/**
 * @openapi
 * /service-request/{id}:
 *   put:
 *     tags:
 *       - ServiceRequest
 *     summary: Actualizar solicitud
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
 *         description: Solicitud actualizada.
 */
router.put("/:id", authenticate, validate(updateServiceRequestSchema), editService);

/**
 * @openapi
 * /service-request/{id}:
 *   delete:
 *     tags:
 *       - ServiceRequest
 *     summary: Eliminar solicitud
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
 *         description: Solicitud eliminada.
 */
router.delete("/:id", authenticate, removeService);

export default router;