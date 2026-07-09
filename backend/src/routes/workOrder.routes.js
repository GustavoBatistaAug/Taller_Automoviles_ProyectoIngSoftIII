import { Router } from "express";
import {
getWorkOrders, getWorkOrder,create, update, 
updateStatus, assignMechanic, addPart, 
removePart, recalculate, remove
} from "../controllers/workOrder.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize as roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
createWorkOrderSchema, updateWorkOrderSchema,
updateWorkOrderStatusSchema, assignMechanicSchema,
addPartSchema, removePartSchema
} from "../validators/workOrder.validator.js";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /work-order:
 *   get:
 *     tags:
 *       - WorkOrder
 *     summary: Obtener todas las órdenes de trabajo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes.
 */
router.get("/", getWorkOrders);

/**
 * @openapi
 * /work-order/{id}:
 *   get:
 *     tags:
 *       - WorkOrder
 *     summary: Obtener orden por ID
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
 *         description: Orden encontrada.
 */
router.get("/:id", getWorkOrder);

/**
 * @openapi
 * /work-order:
 *   post:
 *     tags:
 *       - WorkOrder
 *     summary: Crear una orden de trabajo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Orden creada.
 */
router.post("/", roleMiddleware("ADMIN","RECEPTIONIST"), validate(createWorkOrderSchema), create);

/**
 * @openapi
 * /work-order/{id}:
 *   put:
 *     tags:
 *       - WorkOrder
 *     summary: Actualizar orden de trabajo
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
 *         description: Orden actualizada.
 */
router.put("/:id", roleMiddleware("ADMIN","RECEPTIONIST"), validate(updateWorkOrderSchema), update);
router.patch("/:id/status", roleMiddleware("ADMIN","MECHANIC"), validate(updateWorkOrderStatusSchema), updateStatus);
router.patch("/:id/mechanic", roleMiddleware("ADMIN"), validate(assignMechanicSchema), assignMechanic);
router.post("/:id/parts", roleMiddleware("ADMIN","MECHANIC"), validate(addPartSchema), addPart);
router.delete("/:id/parts", roleMiddleware("ADMIN","MECHANIC"), validate(removePartSchema), removePart);
router.patch("/:id/recalculate", roleMiddleware("ADMIN","MECHANIC"), recalculate);

/**
 * @openapi
 * /work-order/{id}:
 *   delete:
 *     tags:
 *       - WorkOrder
 *     summary: Eliminar orden de trabajo
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
 *         description: Orden eliminada.
 */
router.delete("/:id", roleMiddleware("ADMIN"), remove);

export default router;