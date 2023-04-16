const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.validate = (req, res, next) => {
  // validate the request body, query, and params against a set of rules
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation.js: !errors.isEmpty");
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// isObjectId function takes a value as an argument and returns true if the
// value is a valid MongoDB ObjectId and false otherwise
exports.isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
