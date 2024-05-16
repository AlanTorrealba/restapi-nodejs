import { Router } from "express";
import { getProducts } from "../controllers/products.controllers.js";
const router = Router();

router.get("/products", getProducts);

export default router;
