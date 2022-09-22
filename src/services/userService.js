const User = require("../models/user.model");
const S3Files = require("../middlewares/s3");

const create = async (body) => {
  const user = await new User({
    name: body.name,
    email: body.email,
    hashedPassword: body.password,
  });
  await user.save();
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const list = async () => {
  const user = await User.find();
  return user;
};

const read = async (req) => {
  const user = await User.findById(req.params.userId);
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const update = async (body) => {
  const user = await User.findByIdAndUpdate(body.userId, {
    $set: {
      name: body.name,
      email: body.email,
      hashedPassword: body.password,
    },
  });
  user.updatedAt = Date.now();
  await user.save();
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const remove = async (body) => {
  const user = await User.findByIdAndDelete(body.userId);
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const signIn = async (body) => {
  const user = await User.findOne({ email: body.email });

  return user;
};

const profile = async (body) => {
  console.log(body);
  await S3Files.uploadFileToS3(body);
  const user = await User.findByIdAndUpdate(body.userId, {
    $set: {
      about: body.about,
      photo: body.originalname,
    },
  });
  await user.save();
  return user;
};

const getProfile = async (body) => {
  const key = await User.findById(body.userId);
  console.log(key.photo);
  const url = await S3Files.downloadFileToS3(key.photo);
  key.photo = url;
  console.log(key);
  return key;
};

const userService = {
  create,
  list,
  read,
  update,
  remove,
  signIn,
  profile,
  getProfile,
};

module.exports = userService;
