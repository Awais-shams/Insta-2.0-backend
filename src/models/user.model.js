const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/config.env" });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: "Password is required",
    },
    salt: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  this.salt = await bcrypt.genSalt(10);
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, this.salt);
  next();
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
