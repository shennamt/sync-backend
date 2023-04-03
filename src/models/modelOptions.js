exports.schemaOptions = {
  toJSON: {
    virtuals: true // include virtual properties when converting to JSON
  },
  toObject: {
    virtuals: true // include virtual properties when converting to javascript {}
  },
  timestamp: true // auto inclue createdAt and updatedAt fields in schema
}