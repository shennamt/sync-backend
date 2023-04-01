const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/verify-token", (req, res) => {
  console.log("req.body.token");
  console.log(req.body.token);
  // TODO: decrypt token to get user object
  res.status(200).json({ user: req.user });
});

module.exports = router;
