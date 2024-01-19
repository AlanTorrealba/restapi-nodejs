import { Router } from "express";
import { getPedidos, postPedidos } from "../controllers/pedidos.controllers.js";
const router = Router();

router.get("/pedidos", getPedidos);
router.post("/pedidos", postPedidos);

export default router;
