const globalErrorHanlder = (err, req, res, next) => {
  console.log("in global error handler");
  console.log(err)
  return res.status(err.statusCode || 500).send({
    error: err.message || "Server Error",
    message: null,
    data: null,
  });
};

module.exports = globalErrorHanlder;