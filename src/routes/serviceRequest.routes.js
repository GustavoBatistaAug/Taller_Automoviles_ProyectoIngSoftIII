import { Router } from "express";
import { getServices, getService, setService, editService, removeService } from "../controllers/serviceRequest.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getServices);
router.get("/:id", authenticate, getService);
router.post("/", authenticate, setService);
router.put("/:id", authenticate, editService);
router.delete("/:id", authenticate, removeService);

export default router;