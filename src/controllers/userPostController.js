const userPostService = require("../services/userPostService");

const createPost = async (req, res) => {
  try {
    const userPost = await userPostService.create({
      ...req.body,
      ...req.params,
    });
    res.status(200).json({ userPost });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getPosts = async (req, res) => {
  try {
    console.log("I am here");
    const userPost = await userPostService.read({ ...req.params });
    res.status(200).json({ userPost });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = { createPost, getPosts };
