const User = require("../models/userModel");
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
  user.followers = undefined;
  user.following = undefined;
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

const editProfile = async (body) => {
  await S3Files.uploadFileToS3(body);
  const user = await User.findByIdAndUpdate(body.userId, {
    $set: {
      updatedAt: Date.now(),
      about: body.about,
      photo: body.originalname,
    },
  });
  await user.save();
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const getEditProfile = async (body) => {
  const user = await User.findById(body.userId);
  const downloadImgUrl = await S3Files.downloadFileFromS3(user.photo);
  user.photo = downloadImgUrl;
  await user.save();
  return user;
};

const following = async (body) => {
  console.log("i am here at following service");
  return true;
};

const userService = {
  create,
  list,
  read,
  update,
  remove,
  signIn,
  editProfile,
  getEditProfile,
  following,
};

module.exports = userService;
