const mongoose = require("mongoose");
// `Schema` class imported from `mongoose` module
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
// define `sectionSchema` using the `Schema` constructor
const sectionSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  schemaOptions
);
// `sectionSchema` passed to the `mongoose.model()` function
// to create a `Board` model to interact with board objects in the database
module.exports = mongoose.model("Section", sectionSchema);
