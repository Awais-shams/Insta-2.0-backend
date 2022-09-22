const Response = (error, res, code, message, data, rest = {}) => {
  res.status(code).json({
    error,
    code,
    message,
    data,
    ...rest,
  });
};

module.exports = Response;
