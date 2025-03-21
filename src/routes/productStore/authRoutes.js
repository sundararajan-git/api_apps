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
} from "../../controllers/productStore/userController.js";
import { verifyToken } from "../../middleware/validUser.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/verify", verifyEmail);

router.post("/login", login);

router.get("/isvaliduser", verifyToken, isValidUser);

router.post("/logout", logout);

router.put("/resetpassword/:token", resetPassword);

router.post("/forgotpassword", forgotPassword);

router.put("/updateprofile", updateProfile);

export default router;
