const User = require("../models/user.model");

async function create(body) {
  console.log(body);
  try {
    const user = await new User({
      name: body.name,
      email: body.email,
      hashedPassword: body.password,
    });
    await user.save();
    return user;
  } catch (err) {
    return err;
  }
}

async function get() {
  try {
    const getUser = await User.find();
    return getUser;
  } catch (err) {
    return err;
  }
}

async function getUserById(params) {
  console.log(params);
  try {
    const getUser = await User.findById(params.userId);
    return getUser;
  } catch (err) {
    return err;
  }
}

async function update(body) {
  console.log(body);
  try {
    const updateUser = await User.findByIdAndUpdate(body.userId, {
      $set: {
        name: body.name,
        email: body.email,
        hashedPassword: body.password,
      },
    });
    await updateUser.save();
    return updateUser;
  } catch (err) {
    return err;
  }
}

async function deleteUser(params) {
  console.log(params);
  try {
    const deleteUser = await User.findByIdAndDelete(params.userId);
    return getUser;
  } catch (err) {
    return err;
  }
}

const userService = { create, get, getUserById, update, deleteUser };

module.exports = userService;
