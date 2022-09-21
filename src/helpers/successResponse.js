const getSuccessResponse = async (res, code, data, msg) => {
  return res.status(code).json({
    message: msg,
    success: true,
    data: data,
  });
};

module.exports = getSuccessResponse;
