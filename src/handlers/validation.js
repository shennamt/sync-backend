const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

// checking for validation errors in req
exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }
  next()
}

// check if value is valid MongoDB ObjectId and returns boolean
exports.isObjectId = (value) => mongoose.Types.isObjectId.isValid(value)