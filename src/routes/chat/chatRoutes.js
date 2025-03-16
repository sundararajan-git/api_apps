import express from "express"
import { verifyToken } from "../../middleware/validUser.js"
import { getUsers, getMessage, sendMessage } from "../../controllers/chat/chatController.js"
const router = express.Router()

router.get("/users", verifyToken, getUsers)

router.get("/:id", verifyToken, getMessage)

router.post("/send/:id", verifyToken, sendMessage)


export default router