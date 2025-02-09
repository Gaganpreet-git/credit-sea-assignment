// Wrapper function to wrap controller functions for error handling.
const catchAsync = (fn) => {
    return function (req, res, next) {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
  };
  
  module.exports = catchAsync;