import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import { app, server } from "./sockets/socket.js";
import { errorHandler } from "./middleware/errorHandler.js";

// chat app application
import chatAppuserRoutes from "./routes/chat/userRoutes.js"
import chatAppchatsRoutes from "./routes/chat/chatRoutes.js"


config();

const PORT = process.env.PORT || 8080;

const whiteList = ["http://localhost:5173"]

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// chat application
app.use("/api/v1/chatapp/user", chatAppuserRoutes);
app.use("/api/v1/chatapp/chat", chatAppchatsRoutes);

app.use(errorHandler)

server.listen(PORT, () => {
    connectDB();
    console.log("Server is running on " + PORT);
});

