const mongoose = require("mongoose");

const kanbanSchema = new mongoose.Schema({
  todo: { type: String },
  doing: { type: String },
  done: { type: String },
  tasksAssigned: { type: Boolean, default: false }
});

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
