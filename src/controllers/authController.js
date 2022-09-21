const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const Response = require("../helpers/apiResponse");

const signin = async (req, res) => {
  try {
    const user = await userService.signIn({ ...req.body });
    console.log(user);
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
        Response(true, res, 200, "User SignedIn", user, token);
    //   return res.header("x-auth-token", token).status(200).json({
    //     data: user,
    //     token: token,
    //   });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = signin;
