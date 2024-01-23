import { Router } from "express";
import { getPedidos, postPedidos, deletePedidos } from "../controllers/pedidos.controllers.js";
const router = Router();

router.get("/pedidos", getPedidos);
router.post("/pedidos", postPedidos);
router.delete("/pedidos/:id", deletePedidos);

export default router;
