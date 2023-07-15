/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Note model
const Note = mongoose.model('userNotes', noteSchema);

module.exports = Note;
