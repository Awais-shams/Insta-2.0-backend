const UserPost = require("../models/postModel");

const create = async (body) => {
  const userPost = await new UserPost({
    userId: body.userId,
    photo: body.photo,
    caption: body.caption,
  });
  await userPost.save();
  return userPost;
};

const read = async (body) => {
  console.log(body);
  const userPost = await UserPost.find().populate("userId").select;
  console.log(userPost);
  return userPost;
};

module.exports = { create, read };
