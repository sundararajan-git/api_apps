import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verifactionExpireAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpireAt: {
      type: Date,
    },
    lastLogin: {
      type: Date,
    },
    lastLogout: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
