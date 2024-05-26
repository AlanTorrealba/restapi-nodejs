import { Router } from "express";
import { getDetalles, postDetalles, deleteDetalles, patchDetalles } from "../controllers/detalles.controllers.js";
const router = Router();

router.get("/detalles/:id", getDetalles);
router.post("/detalles", postDetalles);
router.patch("/detalles/:id", patchDetalles )
router.delete("/detalles/:id", deleteDetalles);

export default router;
