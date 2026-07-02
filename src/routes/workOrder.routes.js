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

router.get("/", getWorkOrders);
router.get("/:id", getWorkOrder);
router.post("/", roleMiddleware("ADMIN","RECEPTIONIST"), validate(createWorkOrderSchema), create);
router.put("/:id", roleMiddleware("ADMIN","RECEPTIONIST"), validate(updateWorkOrderSchema), update);
router.patch("/:id/status", roleMiddleware("ADMIN","MECHANIC"), validate(updateWorkOrderStatusSchema), updateStatus);
router.patch("/:id/mechanic", roleMiddleware("ADMIN"), validate(assignMechanicSchema), assignMechanic);
router.post("/:id/parts", roleMiddleware("ADMIN","MECHANIC"), validate(addPartSchema), addPart);
router.delete("/:id/parts", roleMiddleware("ADMIN","MECHANIC"), validate(removePartSchema), removePart);
router.patch("/:id/recalculate", roleMiddleware("ADMIN","MECHANIC"), recalculate);
router.delete("/:id", roleMiddleware("ADMIN"), remove);

export default router;