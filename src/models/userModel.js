const mongoose = require('mongoose')
const { schemaOptions } =  require('./modelOptions')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false // wont be included in query results unless requested
  }
}, schemaOptions)

module.exports = mongoose.model('User', userSchema)