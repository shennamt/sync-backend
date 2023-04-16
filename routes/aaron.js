const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//place all your routes here!

//example
// GET all workouts
app.get("/", (req, res) => {
  res.send("Hello world");
});
module.exports = router;
