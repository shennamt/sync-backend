// a middleware between the routes to ensure that the auth is there before proceeding to the routes
//so protect your routes from unAuth entry!

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  //check got value , if not send error
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //got error send get the token using the split method
  const token = authorization.split(" ")[1];

  //verify the token after verifying get the id
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    //am getting only the Id and passing it down to
    //using the id find the database afterwards next to the route& controller
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
