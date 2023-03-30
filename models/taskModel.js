const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
})

module.exports = mongoose.model('Task', taskSchema)