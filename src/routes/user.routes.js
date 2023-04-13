import { Router } from "express";
import { getUser, loginUser, getProfile, deleteProfile } from "../controllers/user.controllers.js";
const router = Router();

router.get("/user", getUser);
router.post("/login", loginUser);
router.post("/profile", getProfile);
router.post("/logout", deleteProfile);

export default router;
