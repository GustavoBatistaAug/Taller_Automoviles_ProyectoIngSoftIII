import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js"
import { getServices, getService, setService, editService, removeService } from "../controllers/serviceRequest.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createServiceRequestSchema, updateServiceRequestSchema } from "../validators/serviceRequest.validator.js";

const router = Router();

router.get("/", authenticate, getServices);
router.get("/:id", authenticate, getService);
router.post("/", authenticate, validate(createServiceRequestSchema), setService);
router.put("/:id", authenticate, validate(updateServiceRequestSchema), editService);
router.delete("/:id", authenticate, removeService);

export default router;