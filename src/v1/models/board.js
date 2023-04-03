const mongoose = require("mongoose");
// `Schema` class imported from `mongoose` module
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
// define `boardSchema` using the `Schema` constructor
const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // icon: {
    //   type: String,
    //   default: ''
    // }
    title: {
      type: String,
      default: "Untitled"
    },
    description: {
      type: String,
      default: `Add description here`
    },
    position: {
      type: Number
    },
    favourite: {
      type: Boolean,
      default: false
    },
    favouritePosition: {
      type: Number,
      default: 0
    }
  },
  schemaOptions
);
// `boardSchema` passed to the `mongoose.model()` function
// to create a `Board` model to interact with board objects in the database
module.exports = mongoose.model("Board", boardSchema);
