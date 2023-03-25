const mongoose = require("mongoose");

const SignUpSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("signup", SignUpSchema);
