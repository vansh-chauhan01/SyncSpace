import { Router } from "express";
import { registerUser , loginUser , isLoggedIn, logout } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/isLoggedIn", verifyToken ,isLoggedIn);
router.get("/logout", verifyToken , logout)

export default router;