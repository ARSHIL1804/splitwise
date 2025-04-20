class ServerError extends Error {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}


function errorHandler(error, req, res, next) {
    const isKnownError = (typeof error === ServerError)
    return res.status(isKnownError ? error.statusCode : 500).json({
        success: false,
        error: isKnownError ? error.message : "SERVER_ERROR"
    })
}

module.exports = errorHandler;