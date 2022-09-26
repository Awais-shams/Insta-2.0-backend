const UserPost = require("../models/postModel");

const create = async (body) => {
  const userPost = await new UserPost({
    text: body.text,
    photo: body.photo,
    postedBy: body.userId,
  });
  await userPost.save();
  return userPost;
};

const list = async (body) => {
  const userPost = await UserPost.find().populate("postedBy");
  return userPost;
};

const read = async (body) => {
  const userPost = await UserPost.find({ postedBy: body.userId }).populate(
    "postedBy"
  );
  return userPost;
};

const update = async (body) => {
  const userPost = await UserPost.findByIdAndUpdate(body.userId, {
    $set: {
      text: body.text,
    },
  });
  await userPost.save();
  return userPost;
};

const remove = async (body) => {
  const userPost = await UserPost.findByIdAndDelete(body.userId);
  return userPost;
};

const updateLikes = async (body) => {
  const likes = await UserPost.findByIdAndUpdate(body.postId, {
    $push: {
      likes: body.userId,
      new: true,
    },
  });
  await likes.save();
  return likes;
};

const updateUnlikes = async (body) => {
  const likes = await UserPost.findByIdAndUpdate(body.postId, {
    $pull: {
      likes: body.userId,
    },
  });
  await likes.save();
  return likes;
};

const createComments = async (body) => {
  const comments = await UserPost.findByIdAndUpdate(body.postId, {
    $push: {
      comments: {
        text: body.text,
        postedBy: body.userId,
        new: true,
      },
    },
  });
  await comments.save();
  return comments;
};

const updateComments = async (body) => {
  console.log(body);
  const comments = await UserPost.findById(body.postId);
  console.log(comments);
  return comments;
};

module.exports = {
  create,
  list,
  read,
  update,
  remove,
  updateLikes,
  updateUnlikes,
  createComments,
  updateComments,
};
