const express = require("express");
const { create } = require("../model/signupmodel.js");
const router = express.Router();
const signup = require("../model/signupmodel.js");

//importing the function name from the controller
const { createSignup } = require("../controllers/signupcontroller");

//post the function into the controller
router.post("/", createSignup);

router.get("/", (req, res) => {
  res.send("Hello " + PORT);
});

module.exports = router;
