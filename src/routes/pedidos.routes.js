import { Router } from "express";
import { getPedidos } from "../controllers/pedidos.controllers.js";
const router = Router();

router.get("/pedidos", getPedidos);

export default router;
