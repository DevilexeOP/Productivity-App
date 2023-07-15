/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// schema
const todoSchema = new mongoose.Schema({
  toDoTitle: {
    type: String,
    required: true,
  },
  toDoInfo: {
    type: String,
    required: true,
  },
  completeStatus: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating model
const ToDo = mongoose.model('userToDos', todoSchema);

module.exports = ToDo;
