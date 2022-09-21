const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/api/users")
  .post(userController.createUser)
  .get(userController.getUsers);

router
  .route("/api/users/:userId")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
