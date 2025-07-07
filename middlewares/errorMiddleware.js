import dotenv from "dotenv";
dotenv.config();

const errorMiddleware = (err, req, res, next) => {
  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log the error (to console or a logger service)
  console.error(err);

  // Differentiate between environments
  if (process.env.NODE_ENV === "production") {
    // Avoid exposing stack trace in production
    res.status(statusCode).json({
      success: false,
      message,
    });
  } else {
    // Send full error details in development
    res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
    });
  }
};

export default errorMiddleware;
