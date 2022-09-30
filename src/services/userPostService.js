const UserPost = require("../models/postModel");

const create = async (body) => {
  console.log("i am here", body);
  const userPost = await new UserPost({
    text: body.text,
    photo: body.photo,
    postedBy: body._id,
  });
  await userPost.save();
  return userPost;
};

const list = async (body) => {
  const userPost = await UserPost.findById(body._id).populate("postedBy");
  return userPost;
};

const read = async (body) => {
  const userPost = await UserPost.find({ postedBy: body._id })
    .populate("postedBy")
    .sort({ createdAt: -1 });
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

// const updateComments = async (body) => {
//   console.log(body);
//   const userPost = await UserPost.find(body.postId);
//   if (userPost) {
//     const postedBy=await UserPost.
//   }
//   return comment;
// };

const removeComments = async (body) => {
  // const test = await UserPost.findOne(
  //   { _id: "6331a9336af6b2c4fabc03d4" },
  //   {
  //     comments: {
  //       $elemMatch: { _id: "6332cd37738925c0fb1b0766" },
  //     },
  //   }
  // );
  // // test.comments[0].text = "YOOOOOOOOOO!!!!!!!!!!!!!";
  // // test.save();

  // console.log(test);
  const comments = await UserPost.findByIdAndUpdate(body.postId, {
    $pull: {
      comments: {
        _id: body.commentId,
      },
    },
  });
  await comments.save();
  return test;
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
  // updateComments,
  removeComments,
};
