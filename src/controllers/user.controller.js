const userService = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const user = await userService.create({ ...req.body });
    res.send(user);
  } catch (err) {
    res.status(404).send(err);
  }
};

async function getUser(req, res) {
  try {
    const user = await userService.get();
    res.send(user);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getUserById(req, res) {
  try {
    const userExist = await userService.getUserById({ ...req.params });
    if (userExist) {
      res.send(userExist);
    } else {
      res.send("User does not exist");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function updateUserById(req, res) {
  try {
    const updateUser = await userService.update({ ...req.body, ...req.params });
    res.send(updateUser);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteUserById(req, res) {
  try {
    const deleteUser = await userService.deleteUser({ ...req.params });
    res.send(deleteUser);
  } catch (err) {
    res.status(404).send(err);
  }
}

const userController = {
  createUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
};

module.exports = userController;
