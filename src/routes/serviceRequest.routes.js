import { Router } from "express";
import { getServices, getService, setService, editService, removeService } from "../controllers/serviceRequest.controller.js";

const router = Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", setService);
router.put("/:id", editService);
router.delete("/:id", removeService);

export default router;