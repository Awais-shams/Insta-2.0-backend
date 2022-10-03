const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const userPostController = require("../controllers/userPostController");
const authController = require("../controllers/authController");
const upload = require("../middlewares/multer");

router
  .route("/api/posts/new")
  .post(
    authController.hasAuthorization,
    upload.single("photo"),
    userPostController.createPost
  )
  .get(authController.hasAuthorization, userPostController.getPostsById)
  .put(authController.hasAuthorization, userPostController.updatePostById);

router
  .route("/api/posts/new/:postId")
  .delete(authController.hasAuthorization, userPostController.deletePostById);

// router.route("/api/posts").get(userPostController.getPosts);

//  Likes Routes
router.route("/api/posts/:postId/like").put(userPostController.postLikes);
router.route("/api/posts/:postId/unlike").put(userPostController.postUnlikes);

// Comment Routes
router
  .route("/api/posts/:postId/comments")
  .put(userPostController.postCommentsById);

router
  .route("/api/posts/:postId/:commentId/uncomments")
  .put(userPostController.unCommentById);

module.exports = router;
