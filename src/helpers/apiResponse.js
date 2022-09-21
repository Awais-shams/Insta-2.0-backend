const Response = (error, res, code, message, data, token, rest = {}) => {
  if (!error) {
    res.status(code).json({
      error,
      code,
      message,
      data,
      ...rest,
    });
  } else {
    res.status(code).json({
      error,
      code,
      message,
      data,
      ...rest,
    });
  }

  if (error || token != null) {
    console.log("tokennnnnn");
    return res
      .set("x-auth-token", token)
      .status(code)
      .json({
        error,
        code,
        message,
        data,
        token,
        ...rest,
      });
  }
};

module.exports = Response;
