/* eslint-disable prettier/prettier */
const notes_router = require('express').Router();
const userNote = require('../models/Notes');

// Get all notes
notes_router.route('/').get((req, res) => {
  userNote
    .find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new note
notes_router.route('/add').post((req, res) => {
  const {title, description} = req.body;

  const newNote = new userNote({
    title,
    description,
  });

  newNote
    .save()
    .then(() => res.status(200).json('Note added!'))
    .catch(err => res.status(400).json('Error adding note: ' + err));
});

module.exports = notes_router;
