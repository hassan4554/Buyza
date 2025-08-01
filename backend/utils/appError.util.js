class AppError extends Error {
  constructor(message = "Server Error", statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
