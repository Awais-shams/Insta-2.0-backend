const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const userPostController = require("../controllers/userPostController");

router
  .route("/api/posts/new/:userId")
  .post(userPostController.createPost)
  .get(userPostController.getPostsById)
  .put(userPostController.updatePostById)
  .delete(userPostController.deletePostById);

router.route("/api/posts").get(userPostController.getPosts);

//  Likes Routes
router.route("/api/posts/:postId/like").put(userPostController.postLikes);
router.route("/api/posts/:postId/unlike").put(userPostController.postUnlikes);

// Comment Routes
router
  .route("/api/posts/:postId/comments")
  .put(userPostController.postCommentsById);

router
  .route("/api/posts/:postId/:commentId/editComments")
  .put(userPostController.editCommentsById);

module.exports = router;
