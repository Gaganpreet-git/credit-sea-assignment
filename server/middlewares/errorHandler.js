/**
 * Middleware function to handle errors that occur during request processing.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */

const errorHandler = (err, req, res, next) => {
    const code = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const response = { code, message };
    res.status(code).json(response);
  };
  
  module.exports = errorHandler