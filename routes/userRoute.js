const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", loginUser);
router.post("/signup", signupUser);

// middleware to parse the request body
// router.use(express.json());

router.post(
  "/verify-token",
  (req, res) => {
    const token = req.body.token;
    const secret = process.env.SECRET;

    console.log("userRoute.js: req.body.token\n", req.body.token);
    // TODO: decrypt token to get user object
    // Verify the JWT token using the secret key
    // Below method is used to decrypt token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "userRoute.js: Invalid token" });
      }

      // Send the decoded token as the response to the client
      console.log("userRoute: decodedToken", decodedToken);
      res.status(200).json({ id: req.id });
    });
  },
  requireAuth,
  (req, res) => {
    res.status(200).json({ id: req.id });
  }
);

module.exports = router;
