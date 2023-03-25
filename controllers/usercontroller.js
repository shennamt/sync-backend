const user = require("../model/usermodel");

//login user
const logininUser = async (req, res) => {
  res.json({ mssg: "login ser" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await user.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //
  res.json({ mssg: "Signup user" });
};

module.exports = { logininUser, signupUser };
