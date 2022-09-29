const userService = require("../services/userService");
const ErrorHandler = require("../helpers/dbErrorHandler");
const getErrorResponse = require("../helpers/errorResponse");
const getSuccessResponse = require("../helpers/successResponse");
const Response = require("../helpers/apiResponse");

const createUser = async (req, res) => {
  try {
    const user = await userService.create({ ...req.body });
    Response(null, res, 200, "Account created successfully", user);
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
  try {
    const user = await userService.editProfile({
      ...req.params,
      ...req.body,
      ...req.file,
    });
    Response(null, res, 200, "Profile updated successfully", user);
  } catch (err) {
    Response(false, res, 400, "Profile updated failed", err);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getEditProfile({
      ...req.params,
    });
    Response(null, res, 200, "Profile Retrieved successfully", user);
  } catch (err) {
    Response(true, res, 400, "Profile Retrieved failed", err);
  }
};

const addFollowing = async (req, res) => {
  console.log("i am here at controller");
  const test = await userService.following();
  console.log(test);
};

const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userProfile,
  getUserProfile,
  addFollowing,
};

module.exports = userController;
