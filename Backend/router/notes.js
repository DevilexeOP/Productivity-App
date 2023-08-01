/* eslint-disable prettier/prettier */
const notes_router = require('express').Router();
const Note = require('../models/Notes');

// Get all notes
notes_router.route('/').get((req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new note
notes_router.route('/add').post((req, res) => {
  const {title, description} = req.body;

  const newNote = new Note({
    title,
    description,
  });

  newNote
    .save()
    .then(() => res.status(200).json('Note added!'))
    .catch(err => res.status(400).json('Error adding note: ' + err));
});

// update the notes
notes_router.route('/update/:_id').put(async (req, res) => {
  try {
    const _id = req.params._id;
    const updatedNote = req.body;
    const options = {new: true};
    const result = await Note.findByIdAndUpdate(_id, updatedNote, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({message: error.message});
    console.log('error updating' + error);
  }
});

//delete the notes
notes_router.route('/delete/:_id').delete(async (req, res) => {
  try {
    const _id = req.params._id;
    const noteData = await Note.findByIdAndDelete(_id);
    res.status(200).json(noteData);
  } catch (error) {
    res.status(400).json({message: error.message});
    console.log('error' + error);
  }
});

module.exports = notes_router;
