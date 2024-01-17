import { Router } from "express";
import { getClient } from "../controllers/client.controllers.js";
const router = Router();

router.get("/client", getClient);

export default router;
