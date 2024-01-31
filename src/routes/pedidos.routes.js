import { Router } from "express";
import { getPedidos, postPedidos, deletePedidos, patchPedidos } from "../controllers/pedidos.controllers.js";
const router = Router();

router.get("/pedidos", getPedidos);
router.post("/pedidos", postPedidos);
router.patch("/pedidos", patchPedidos )
router.delete("/pedidos/:id", deletePedidos);

export default router;
