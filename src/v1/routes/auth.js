const router = require("express").Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const User = require("../models/user");
// three endpoints - signup, login, verify-token
router.post(
  "/signup",
  // validation checks if below fields are least 1 character long
  body("username")
    .isLength({ min: 2 })
    .withMessage("username must be at least 2 characters"),
  body("password")
    .isLength({ min: 2 })
    .withMessage("password must be at least 2 characters"),
  body("confirmPassword")
    .isLength({ min: 2 })
    .withMessage("confirmPassword must be at least 2 characters"),
  // uses custom validation function to check if the username is
  // already in use
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already used");
      } else return Promise.resolve();
    });
  }),
  validation.validate,
  // function uses HTTP POST method and userController.register to handle request
  userController.register
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 2 })
    .withMessage("username must be at least 2 character"),
  body("password")
    .isLength({ min: 2 })
    .withMessage("password must be at least 2 character"),
  validation.validate,
  userController.login
);
// /verify-token endpoint takes in the HTTP POST method and uses the
// tokenHandler.verifytoken function to verify the token
// if token is verified, user object is attached to the req object and
// returned as a JSON response
// if token is not verified, 401 unauthorized status code is returned
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
