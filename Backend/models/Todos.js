/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const shortid = require('shortid');
// schema
const todoSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  todoTitle: {
    type: String,
    required: true,
  },
  todoDescription: {
    type: String,
    required: true,
  },
  todoPriority: {
    type: String,
  },
  todoStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // __v 32 is
  // Object-Document Mapper
  // to keep a track of doc when its updated and saved
});

// Creating model
const ToDo = mongoose.model('userToDos', todoSchema);

module.exports = ToDo;
