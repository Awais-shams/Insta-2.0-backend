const userPostService = require("../services/userPostService");
const Response = require("../helpers/apiResponse");

const createPost = async (req, res) => {
  try {
    console.log(req.user);
    const userPost = await userPostService.create({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "post created successfully", userPost);
  } catch (err) {
    Response(true, res, 400, "post created failed");
  }
};

const getPosts = async (req, res) => {
  try {
    const userPost = await userPostService.list({ ...req.params });
    Response(false, res, 200, "posts retrieved successfully", userPost);
  } catch (err) {
    Response(true, res, 400, "posts retrieved failed");
  }
};

const getPostsById = async (req, res) => {
  try {
    const userPost = await userPostService.read({ ...req.params });
    Response(false, res, 200, "post retrieved successfully", userPost);
  } catch (err) {
    Response(true, res, 400, "post retrieved failed");
  }
};

const updatePostById = async (req, res) => {
  try {
    const userPost = await userPostService.update({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "post updated successfully", userPost);
  } catch (err) {
    Response(true, res, 400, "post updated failed");
  }
};

const deletePostById = async (req, res) => {
  try {
    const userPost = await userPostService.remove({ ...req.params });
    Response(false, res, 200, "post deleted successfully", userPost);
  } catch (err) {
    Response(true, res, 400, "post deleted failed");
  }
};

const postLikes = async (req, res) => {
  try {
    const likes = await userPostService.updateLikes({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "Like updated successfully", likes);
  } catch (err) {
    Response(true, res, 400, "like updated failed");
  }
};

const postUnlikes = async (req, res) => {
  try {
    const likes = await userPostService.updateUnlikes({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "Unlike updated successfully", likes);
  } catch (err) {
    Response(true, res, 400, "Unlike updated failed");
  }
};

const postCommentsById = async (req, res) => {
  try {
    const comments = await userPostService.createComments({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "comment posted successfully", comments);
  } catch (err) {
    Response(true, res, 400, "comment posted failed");
  }
};

// const editCommentsById = async (req, res) => {
//   try {
//     const comments = await userPostService.updateComments({
//       ...req.body,
//       ...req.params,
//     });
//     Response(false, res, 200, "comment updated successfully", comments);
//   } catch (err) {
//     Response(true, res, 400, "comment updated failed");
//   }
// };

const unCommentById = async (req, res) => {
  try {
    const comments = await userPostService.removeComments({
      ...req.body,
      ...req.params,
    });
    Response(false, res, 200, "comment removed successfully", comments);
  } catch (err) {
    Response(true, res, 400, "comment removed failed");
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePostById,
  deletePostById,
  postLikes,
  postUnlikes,
  postCommentsById,
  // editCommentsById,
  unCommentById,
};
