const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/userModel')

// verify authenticity and validity of JWT token
const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization']
  if (bearerHeader) { // if authorization present
    const bearer = bearerHeader.split(' ')[1] // splits header value by space to seperate Bearer keyword and token
    try {
      const tokenDecoded = jsonwebtoken.verify( // verifies token
        bearer,
        process.env.TOKEN_SECRET_KEY
      )
      return tokenDecoded // if verified, decoded token returned
    } catch { 
      return false // if token is invalid or expired
    }
  } else {
    return false // if auth header not present
  }
}

// protect routes/endpoints that require authentication and authorization for use in route handlers/ middleware
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req) // extract and decond JWT token for auth header in req
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id) // retrieves user ID and searches db
    if (!user) return res.status(401).json('Unauthorized')
    req.user = user // this middleware sets the property to the found user and calls next()
    next ()
  } else {
    res.status(401).json('Unauthorized')
  }
}