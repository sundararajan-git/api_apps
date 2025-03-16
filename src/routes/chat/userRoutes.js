import express from "express";
import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  verifyEmail,
  isValidUser,
} from "../../controllers/chat/userController.js";
import { verifyToken } from "../../middleware/validUser.js";

const router = express.Router();

router.get("/isvaliduser", verifyToken, isValidUser);

router.post("/signup", signUp);

router.post("/verify", verifyEmail);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updateprofile", updateProfile);

router.put("/resetpassword/:token", resetPassword);

router.post("/forgotpassword", forgotPassword);

export default router;
