import { Router } from "express";
import { getRepartidor } from "../controllers/repartidor.controllers.js";
const router = Router();

router.get("/repartidor", getRepartidor);

export default router;
