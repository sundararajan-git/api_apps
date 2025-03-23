import jwt from "jsonwebtoken";

const generateToken = (res, userId, next) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (err) {
    next(err);
  }
};

export default generateToken;
