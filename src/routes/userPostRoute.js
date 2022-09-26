const express = require("express");
const router = express.Router();

const userPostController = require("../controllers/userPostController");

router
  .route("/api/users/:userId/posts")
  .post(userPostController.createPost)
  .get(userPostController.getPosts);

module.exports = router;
