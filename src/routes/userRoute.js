const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router
  .route("/api/users")
  .post(userController.createUser)
  .get(userController.getUsers);

router
  .route("/api/users/:userId")
  .get(authController.hasAuthorization, userController.getUserById)
  .put(authController.hasAuthorization, userController.updateUserById)
  .delete(authController.hasAuthorization, userController.deleteUserById);

router.route("/api/users/:userId/profile").put(userController.userProfile);

module.exports = router;
