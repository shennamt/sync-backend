import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorisation"); // grabbing authorisation header where token is set in the frontend
    
    if (!token) {
      res.status(403).send("Authorisation token not found. Access denied.");
    }

    if (token.startsWith("Bearer ")) { // token should begin with Bearer
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();

    // TLDR if you want to protect a route, use verifyToken as a middleware

  } catch (err) {
    res.status(500).send({
      errMesage: "Internal server error occured.",
      details: err.message,
    });
  }
}