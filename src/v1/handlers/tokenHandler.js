const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const tokenDecode = (req) => {
  // extract JWT from the HTTP Authorization header
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      // verifies JWT using the jsonwebtoken.verify() method
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY
      );
      // if successfully verified, return decoded token object
      return tokenDecoded;
    } catch {
      // if JWT cannot be verified, return false
      return false;
    }
  } else {
    // if HTTP Authorization header is not present return false
    return false;
  }
};

exports.verifyToken = async (req, res, next) => {
  // calls the tokenDecode function to decode and verify JWT
  // provided in the HTTP Authorization header
  console.log("tokenHandler.js: tokenDecode(req)\n", tokenDecode(req));
  const tokenDecoded = tokenDecode(req);
  // if JWT is successfully verified, extracts user ID from
  // the decode token and looks up the corresponding user in the
  // MongoDB database using the User.findById() method
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    // if user is not found, return 401 unauthorized response
    if (!user) {
      console.log("tokenHandler.js: user\n", user);
      return res.status(401).json("unauthorized");
    }
    // if user is found, attach user object to req object for use in
    // subsequent middleware functions
    req.user = user;
    next();
  } else {
    console.log("tokenHandler.js else part: Unauthorized");
    res.status(401).json("Unauthorized");
  }
};
