import User from "../../models/chat/userModel.js";
import Message from "../../models/chat/chatModel.js";
import { AppError } from "../../utils/appError.js"
import { getReceiverSocketId, io } from "../../sockets/socket.js";

export const getUsers = async (req, res, next) => {
  try {

    const loginUserId = req.userId;

    if (!loginUserId) {
      throw new AppError("User id not found", 400)
    }

    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );

    if (!filteredUsers) {
      throw new AppError("Users not found", 400)
    }

    return res.status(200).json({ success: true, filteredUsers });

  } catch (err) {
    next(err)
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: reciveUserId } = req.params;

    const sendUserId = req.userId;

    if (!sendUserId || !reciveUserId) {
      throw new AppError("User ids not found", 400)
    }

    const message = await Message.find({
      $or: [
        { recviedId: sendUserId, senderId: reciveUserId },
        { recviedId: reciveUserId, senderId: sendUserId },
      ],
    });

    if (!message) {
      throw new AppError("Message not found", 400)
    }

    return res.status(200).json({ success: true, message });

  } catch (err) {
    next(err)
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { id: reciveUserId } = req.params;

    const sendUserId = req.userId;

    if (!sendUserId || !reciveUserId) {
      throw new AppError("User ids not found", 400)
    }

    const { text, image } = req.body;

    if (!text) {
      throw new AppError("message is required", 400)
    }

    let imageURL;

    if (image) {
      imageURL = "dshcbasd";
    }

    const newMessage = new Message({
      senderId: sendUserId,
      recviedId: reciveUserId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    const reciverSocketId = getReceiverSocketId(reciveUserId)

    console.log(reciverSocketId)

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({ success: true, message: newMessage });

  } catch (err) {
    next(err)
  }
};
