const mongoose = require("mongoose");

const User = require("../models/userModel");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: User,
    },
    photo: {
      type: String,
    },
    caption: {
      type: String,
      trim: true,
      required: "caption/message is required",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: null,
    },
    comments: {
      type: String,
      default: null,
    },
    updatedAt: Date,
  },

  { versionKey: false }
);

const UserPost = mongoose.model("post", postSchema);

module.exports = UserPost;
