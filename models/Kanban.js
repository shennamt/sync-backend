import mongoose from "mongoose"; // mongodb access

const kanbanSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  columnName: { type: Array, required: true },
  toDo: { type: Array, required: true },
  inProgress: { type: Array, required: true },
  done: { type: Array, required: true },
  assignees: { type: Array, required: true },
});

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
