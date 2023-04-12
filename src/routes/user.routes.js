import { Router } from "express";
import { getUser, loginUser, getProfile } from "../controllers/user.controllers.js";
const router = Router();

router.get("/user", getUser);
router.post("/login", loginUser);
router.post("/profile", getProfile);

export default router;
