const errorMiddleware = (err, req, res, next) => {
  console.error("error middleware executed", err.stack);
  
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
};

module.exports = errorMiddleware;
