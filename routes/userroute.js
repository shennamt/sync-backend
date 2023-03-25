const express = require("express");

//controller fucntion
const { logininUser, signupUser } = require("../controllers/usercontroller");

const router = express.Router();

//login route
router.post("/login", logininUser);

//signup route
router.post("/signup", signupUser);

module.exports = router;
