const router = require('express').Router()
const userController = require('../controllers/userController')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/userModel')

// using express-validator lib to validate input data

// SIGN UP ROUTE
router.post(
  '/signup',
  body('username').isLength({ min: 8 }).withMessage(
    'username must be at least 8 characters long'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'passowrd must be at least 8 characters long'
  ),
  body('confirmPassword').isLength({ min: 8 }).withMessage(
    'confirmPassword must be at least 8 characters long'
  ),
  body('username').custom(value => { // make sure no similar username in db
    return User.findOne({ username: value}).then(user => {
      if (user) {
        return Promise.reject('username already in use')
      }
    })
  }),
  validation.validate, // ensure any validation errs are caught
  userController.register
)

// LOGIN ROUTE
router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage( // middleware fuction to validate data
    'username must be at least 8 characters long'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'passowrd must be at least 8 characters long'
  ),
  validation.validate,
  userController.login
)

// route is protected. only can be accessed by users with valid JWT
router.post(
  'verify-token',
  tokenHandler.verifyToken, // middleware fuction to validate. if valid, user info is stored in req.user property
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router