const User = require('../models/userModel')
const CryptoJS = require('crypto-js') // for hashing and encryption
const jsonwebtoken = require('jsonwebtoken')

// POST for user reg
exports.register = async (req, res) => {
  const { password } = req.body
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY // this secret key is used to encrypt and decrypt data
    )
    const user = await User.create(req.body)
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' } // generates new token which expires aft 24hr, afterwhich need to login again
    )
    res.status(201).json({ user, token }) // new resource created
  } catch (err) {
    res.status(500).json(err) // internal server error
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body // extract user and pw using destructuring assignment
  try {
    const user = await User.create.findOne({ username }).select('password username')
    if (!user) {
      return res.status(401).json({
        errors: [
          {
          param: 'username',
          msg: 'Invalid username or password'
          }
        ]
      })
    }
    const decryptedPass = CryptoJS.AES.decrypt( // if user found, decrypt password
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)
    if(decryptedPass !== password) { // if decrypted password doesnt match the one in req.body
      return res.status(401).json({ // tell user it's invalid
        errors: [
          {
          param: 'username',
          msg: 'Invalid username or password'
          }
        ]
      })
    }
    user.password = undefined // upon successfull authentication, set pw to undefined to remove from res.body
    const token = jsonwebtoken.sign( // then gen JWT token with 24 signing in validity
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}