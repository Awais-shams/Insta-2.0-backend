const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const Response = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/config.env" });

const signin = async (req, res) => {
  try {
    const user = await userService.signIn({ ...req.body });
    if (!user) {
      Response(false, res, 400, "Invalid Email");
    }
    const compare = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );
    if (!compare) {
      Response(false, res, 400, "Invalid Password");
    } else {
      const token = await user.generateAuthToken();
      res.cookie("jwt", token, { expire: new Date() + 9999 });
      return res.header("x-auth-token", token).status(200).json({
        message: "User signed in successfully",
        data: user,
        token: token,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return Response(true, res, 200, "Signed out successfully");
  } catch (err) {
    res.send(err);
  }
};

const hasAuthorization = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(404).json({
      message: "Acces Denied",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(404).json({
        message: "Invalid Token",
      });
    } else {
      req.user = decode;
      next();
    }
  } catch (err) {
    return res.send(err);
  }
};

const authController = {
  signin,
  signout,
  hasAuthorization,
};

module.exports = authController;
