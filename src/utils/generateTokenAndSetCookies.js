import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
  try {

    const token = jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;

  } catch (err) {
    next(err)
  }
};
