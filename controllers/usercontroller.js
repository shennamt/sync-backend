const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//receiving the Id from the middleware
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const userId = user.id;
    // console.log("Backend userController.js - userId:\n", userId);
    // console.log("Backend userController.js - req.body:\n", req.body);
    // create a token
    const token = createToken(user._id);
    // console.log("Backend userController.js - token:\n", token);

    res.status(200).json({ email, token, userId, occupation: user.occupation });
    console.log(occupation);
    module.exports.userId = userId;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, occupation } = req.body;
  //using the user model we are creating, taking into the two agurments email and password we put in the model
  try {
    const user = await User.signup(email, password, occupation);

    // create a token
    const token = createToken(user._id);
    // send back a response of email and user object^
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
