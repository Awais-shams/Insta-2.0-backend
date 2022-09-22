const userService = require("../services/userService");
const ErrorHandler = require("../helpers/dbErrorHandler");
const getErrorResponse = require("../helpers/errorResponse");
const getSuccessResponse = require("../helpers/successResponse");

const createUser = async (req, res) => {
  try {
    const user = await userService.create({ ...req.body });
    getSuccessResponse(res, 200, user, "New user has been created");
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await userService.list();
    getSuccessResponse(res, 200, user, "Users List");
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getUserById = async (req, res) => {
  try {
    // * User service
    const user = await userService.read(req);

    if (!user) {
      // * Error response helper
      getErrorResponse(res, 404, "User Not Found");
    } else {
      // * Success response helper
      getSuccessResponse(res, 200, user, "user retrieved successfully");
    }
  } catch (err) {
    getErrorResponse(res, 400, "Could not Find User");
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await userService.update({ ...req.body, ...req.params });
    if (!user) {
      getErrorResponse(res, 404, "User Not Found");
    } else {
      getSuccessResponse(res, 200, user);
    }
  } catch (err) {
    getErrorResponse(res, 400, "Could not Update User");
  }
};
const deleteUserById = async (req, res) => {
  try {
    const user = await userService.remove({ ...req.params });
    if (!user) {
      getErrorResponse(res, 404, "User Not Found");
    } else {
      getSuccessResponse(res, 200, user);
    }
  } catch (err) {
    getErrorResponse(res, 400, "Could not delete User");
  }
};

const userProfile = async (req, res) => {
  const user = await userService.profile({
    ...req.params,
    ...req.body,
    ...req.file,
  });
  try {
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserProfile = async (req, res) => {
  const user = await userService.getProfile({
    ...req.params,
  });
  try {
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send(err);
  }
};

const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userProfile,
  getUserProfile,
};

module.exports = userController;
