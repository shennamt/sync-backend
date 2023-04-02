const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const columnSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    default: ''
  }
}, schemaOptions)

module.exports = mongoose.model('Column', columnSchema)