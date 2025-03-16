import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    verificationToken: {
        type: String,
    },
    verificatonTokenExpireAt: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpireAt: {
        type: Date
    },
    lastLogout: {
        type: Date
    }
}, {
    timestamps: true
})


const User = model("chatapp_user", UserSchema)

export default User;