const mongoose = require("mongoose")
const Schema = mongoose.Schema

const columnSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    default: ''
  },
})

module.exports = mongoose.model('Column', columnSchema)