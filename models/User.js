const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  student: Boolean,
  professional: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports = User;
