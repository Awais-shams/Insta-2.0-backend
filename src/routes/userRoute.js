const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = require("../middlewares/multer");

router
  .route("/api/users")
  .post(userController.createUser)
  .get(userController.getUsers);

router
  .route("/api/users/:userId/profile")
  .put(upload.single("image"), userController.userProfile)
  .get(userController.getUserProfile);

router
  .route("/api/users/:userId")
  .get(authController.hasAuthorization, userController.getUserById)
  .put(authController.hasAuthorization, userController.updateUserById)
  .delete(authController.hasAuthorization, userController.deleteUserById);

router.route("/api/users/follow").put(userController.addFollowing);

module.exports = router;
