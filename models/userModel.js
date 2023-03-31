const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  occupation: {
    type: String,
    required: true
  },
  firstName: { type: String },
  lastName: { type: String },
  student: Boolean,
  professional: Boolean
});

// static signup method
userSchema.statics.signup = async function (email, password, occupation) {
  // validation
  // first validates that the required fields are present (email and password)
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  const exists = await this.findOne({ email });
  // checks if the email already exists in the database
  if (exists) {
    throw Error("Email already in use");
  }
  // If the email is not already in use, it generates a salt using the
  // bcrypt.genSalt() method and uses it to hash the user's password using
  // the bcrypt.hash() method.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // creates a new user in the database using the this.create() method and
  // returns the new user
  const user = await this.create({
    email,
    password: hash,
    occupation
  });

  return user;
};

// static login method to authenticate an existing user
userSchema.statics.login = async function (email, password, occupation) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  // if a user is found, it compares the hashed password stored in the database
  // with the input password using the bcrypt.compare() method. If the
  // passwords match, it returns the user.
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
