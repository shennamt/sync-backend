const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/verify-token", (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
