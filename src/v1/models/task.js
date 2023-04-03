const mongoose = require("mongoose");
// `Schema` class imported from `mongoose` module
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
// define `taskSchema` using the `Schema` constructor
const taskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    position: {
      type: Number
    }
  },
  schemaOptions
);
// `taskSchema` passed to the `mongoose.model()` function
// to create a `Section` model to interact with section objects in the database
module.exports = mongoose.model("Task", taskSchema);
