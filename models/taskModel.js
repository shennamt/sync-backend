const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const taskSchema = new Schema({
  column: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  position: {
    type: Number
  }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)