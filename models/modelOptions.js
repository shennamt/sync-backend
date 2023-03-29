exports.schemaOptions = {
  toJSON: {
    // called when doc is converted to JSON obj
    // it specifies that virtual properties should be included in JSON output
    // e.g. properties that are not persisted in the database but computed from other properties
    virtuals: true
  },
  toObject: {
    // called when a document is converted to a plain JavaScript object
    // specifies that virtual properties should be included in the output
    virtual: true
  },
  // boolean flag that indicates whether Mongoose should automatically manage the createdAt and updatedAt fields for documents
  timestamp: true
}