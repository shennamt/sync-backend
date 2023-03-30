const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { schemaOptions } = require('./modelOptions')

const projectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  description: {
    type: String,
    default: `Add description here`
  },
  position: {
    type: Number,
  },
  favourite: {
    type: Boolean,
    default: false
  },
  favouritePosition: {
    type: Number,
    default: 0
  },
  // agile: Boolean,
  // kanban: Boolean,
  // member: { type: Array, default: [] }
});

module.exports = mongoose.model('Project', projectSchema);