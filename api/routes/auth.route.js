import express from "express";
import {
  forgotPassword,
  google,
  loginAdmin,
  resetPassword,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/adminLogin", loginAdmin);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
