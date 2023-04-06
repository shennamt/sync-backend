const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");
// userSchema is created by calling the `mongoose.Schema()` constructor
// and pass in two arguments
// an object defining the schema's fields
// and an object with schema options exported from another module
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      // password will not be included by default when querying the database
      // for a user for security reasons
      select: false
    },
    occupation: {
      type: String,
      required: true
    }
  },
  schemaOptions
);
// once userSchema is defined, it can be used to create a mongoose model
// for interacting with the `User` collection in the database
module.exports = mongoose.model("User", userSchema);
