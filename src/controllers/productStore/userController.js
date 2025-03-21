import User from "../../models/productStore/userModel.js"
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookies.js";
import MailService from "../../utils/sendMailHandler.js"
import { AppError } from "../../utils/appError.js";
import { forgotPasswordTemplate, resetSuccessTemplate, sendWelcomeTemplate, verificationTemplate } from "../../emailTemplates/productStore/emailTemplate.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400)
    }

    let user = await User.findOne({ email });

    if (user) {
      throw new AppError("User already exists", 400)
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verifactionExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id, next);

    const subject = "Verify Your Email"

    await MailService.sendVerificationMail(email, subject, verificationToken, verificationTemplate)

    res.status(200).json({
      message: "User created successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    next(err)
  }
};

export const verifyEmail = async (req, res, next) => {
  try {

    const { code } = req.body;

    if (!code) {
      throw new AppError("Code is required", 400)
    }

    const user = await User.findOne({
      verificationToken: code,
      verifactionExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid code", 400);
    }

    user.isVerfied = true;
    user.verificationToken = undefined;
    user.verifactionExpireAt = undefined;

    await user.save();

    const subject = "Welcome"

    await MailService.sendWelcomeCall(user.email, subject, user.name, sendWelcomeTemplate)

    res.status(200).json({
      message: "Email verified successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    next(err)
  }
};

export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("All fields are required", 400)
    }

    let user = await User.findOne({ email });

    if (!user) {
      throw new AppError("User does not exist", 400)
    }

    const isvalidPassword = await bcryptjs.compare(password, user?.password);

    if (!isvalidPassword) {
      throw new AppError("Invalid password", 400)
    }

    user.lastLogin = new Date();

    await user.save();

    generateTokenAndSetCookie(res, user._id, next);

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    next(err)
  }
};



export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully !" });
  } catch (err) {
    next(err)
  }
};

export const forgotPassword = async (req, res, next) => {
  try {

    const { email } = req.body;

    if (!email) {
      throw new AppError("All fields are required", 400)
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("User does not exist", 400)
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordTokenExpireAt = Date.now() + 1 * 60 * 60 * 10000;

    await user.save();

    const subject = "Forgot password";

    const link = `http://localhost:5173/resetpassword/${user.resetPasswordToken}`

    await MailService.forgotPassword(user.email, subject, link,
      forgotPasswordTemplate
    )

    res.status(200).json({
      message: "Email send successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });

  } catch (err) {
    next(err)
  }
};

export const resetPassword = async (req, res, next) => {
  try {

    const { password } = req.body;

    const { token } = req.params;

    if (!token || !password) {
      throw new AppError("All fields are required", 400)
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid token", 400)
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;

    await user.save();

    const subject = "Password reset sucessfull";

    await MailService.passwordRestSuccess(user.email, subject, resetSuccessTemplate)

    res
      .status(200)
      .json({ message: "Password reset successfully" });

  } catch (err) {
    next(err)
  }
};

export const updateProfile = async (req, res, next) => {
  try {

    const { name, password, profilePic, id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new AppError("User not Found !", 400)
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    user.profilePicture = profilePic;

    await user.save();

    generateTokenAndSetCookie(res, res._id, next);

    res
      .status(200)
      .json({ message: "Profile updated successfully" });

  } catch (err) {
    next(err)
  }
};

export const isValidUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      throw new AppError("User not found", 400)
    }

    res.status(200).json({
      user,
    });

  } catch (err) {
    next(err)
  }
};
