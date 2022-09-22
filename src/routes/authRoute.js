const express = require("express");
const router = express.Router();

// const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.route("/auth/signin").post(authController.signin);
router.route("/auth/signout").get(authController.signout);

module.exports = router;
