import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js"

export const verifyToken = (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      throw new AppError("No token provied", 400)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new AppError("Invalid token provied", 400)
    }

    req.userId = decoded.userId;

    next();

  } catch (err) {
    next(err)
  }
};
