const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/userModel')

const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization']
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1]
    try {
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY
      )
      return tokenDecoded
    } catch {
      return false
    }
  } else {
    return false
  }
}

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req) // decodes JWT token from auth header
  if (tokenDecoded) { // returns the decoded token if its valid or not.
    const user = await User.findById(tokenDecoded.id) // query db using user to find user with match id
    if (!user) { // no user means invalid
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = user //set user {} from db as property of req {}
    next()
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
