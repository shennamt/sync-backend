const user = require("../model/usermodel");

//login user
const logininUser = async (req, res) => {
  res.json({ mssg: "login ser" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  //using the user model we are creating, taking into the two agurments email and password we put in the model
  try {
    const user = await user.signup(email, password);
    // send back a response of email and user object^
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //
  res.json({ mssg: "Signup user" });
};

module.exports = { logininUser, signupUser };
