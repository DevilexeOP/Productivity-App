/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const shortid = require('shortid');
// Define the Note schema
const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
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
