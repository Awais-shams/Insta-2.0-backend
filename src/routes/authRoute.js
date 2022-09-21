const express = require("express");
const router = express.Router();

// const userController = require("../controllers/userController");
const signin = require("../controllers/authController");

router.route("/auth/signin").post(signin);
// router.route("/auth/signout").delete(userController.createUser);

module.exports = router;
