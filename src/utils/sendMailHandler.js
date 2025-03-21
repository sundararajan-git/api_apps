import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_SENDER_KEY
            }
        }),
            this.from = process.env.EMAIL_SENDER
    }


    async sendVerificationMail(to, subject, verificationToken,
        verificationTemplate
    ) {

        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: verificationTemplate(verificationToken)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }
    }

    async sendWelcomeCall(to, subject, name, sendWelcomeTemplate) {

        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: sendWelcomeTemplate(name)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

    async forgotPassword(to, subject, link, forgotPasswordTemplate) {

        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: forgotPasswordTemplate(link)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

    async passwordRestSuccess(to, subject, resetSuccessTemplate) {

        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: resetSuccessTemplate()
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

}

export default new MailService()

