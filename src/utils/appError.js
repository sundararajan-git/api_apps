export class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = "appError"
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}