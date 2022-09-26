const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: "Text is required",
    },
    photo: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },

  { versionKey: false }
);

const UserPost = mongoose.model("post", postSchema);

module.exports = UserPost;
