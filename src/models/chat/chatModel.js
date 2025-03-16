import { Schema, model } from "mongoose"

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recviedId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Message = model("chatapp_message", messageSchema)

export default Message