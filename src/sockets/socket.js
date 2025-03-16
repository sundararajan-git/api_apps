import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const whiteList = ["http://localhost:5173", "*"]

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (whiteList.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSockets = {};

export const getReceiverSocketId = (userId) => {
  return userSockets[userId];
};

io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;

  console.log(`User connected: ${userId} -> ${socket.id}`); //

  if (userId) {
    userSockets[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSockets));

  socket.on("disconnect", () => {

    for (const id in userSockets) {
      if (userSockets[id] === socket.id) {
        delete userSockets[id];
        break;
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSockets));
  });
});

export { io, app, server };
