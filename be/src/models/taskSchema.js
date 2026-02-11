const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, require },
    status: { type: String, enum: ["active", "complete"], default: "active" },
    completedAt: { type: Date, default: null },
    createdAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("task", taskSchema);
module.exports = { Task, taskSchema };
