const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  agile: Boolean,
  kanban: Boolean,
  member: { type: Array, default: [] }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
