// any virtual properties defined on the schema will be included when the
// model is serialized to JSON or converted to a plain JS object
exports.schemaOptions = {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamp: true
};
