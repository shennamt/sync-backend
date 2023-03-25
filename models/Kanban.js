const mongoose = require("mongoose");

const kanbanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean
});

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
