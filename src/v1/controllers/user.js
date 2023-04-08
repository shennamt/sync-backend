const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");
const user = require("../models/user");

exports.register = async (req, res) => {
  const { password, occupation } = req.body;
  console.log("user.js req.body\n", req.body);
  // register function encrypts the user's password using
  // CryptoJS.AES.encrypt method and creates a new user in
  // MongoDB database using User.create
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY,
      { expiresIn: "24h" }
    );
    req.body.occupation = occupation;
    const user = await User.create(req.body);
    // After user is created successfully, a JSON web token is
    // generated using the jsonwebtoken.sign() method and returned
    // in the response along with the newly created user data
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password, occupation } = req.body;
  try {
    // login function retrieves the user from the MongoDB database
    // using the User.findOne() method based on the username provided
    // in the request body
    const user = await User.findOne({ username }).select(
      "password username occupation"
    );
    // if user does not found or the password is incorrect during the
    // login process, a 401 unauthorized response is sent back to the
    // client with an error message in the response body
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid user"
          }
        ]
      });
    }
    // if user exists, their encrypted password is decrypted using the
    // CryptoJS.AES.decrypt method and compared to the password
    // provided in the request body
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "Invalid password"
          }
        ]
      });
    }

    user.password = undefined;

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({ username: user.username, occupation: user.occupation, token });
    console.log("backend/user.js", username, occupation, token);
  } catch (err) {
    res.status(500).json(err);
  }
};
