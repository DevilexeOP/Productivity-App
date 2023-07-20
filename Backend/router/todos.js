/* eslint-disable prettier/prettier */
const todo_router = require('express').Router();
const ToDo = require('../models/Todos');

// Get Route
todo_router.route('/').get((req, res) => {
  ToDo.find()
    .then(todos => res.status(201).json(todos))
    .catch(error => {
      res.status(400).json('Error' + error);
    });
});

// Add new todo
todo_router.route('/add').post((req, res) => {
  const {_id, todoTitle, todoDescription, todoPriority, todoStatus, createdAt} =
    req.body;

  // new obj
  const todo = new ToDo({
    _id,
    todoTitle,
    todoDescription,
    todoStatus,
    todoPriority,
    createdAt,
  });

  todo
    .save()
    .then(() => res.status(201).json('Todo Added'))
    .catch(err => res.status(400).json('Error adding todo' + err));
});

// Update todo
todo_router.route('/update/:_id').put(async (req, res) => {
  try {
    const _id = req.params._id;
    const updatedTodo = req.body;
    const options = {new: true};
    const result = await ToDo.findByIdAndUpdate(_id, updatedTodo, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// delete todo
todo_router.route('/delete/:_id').delete(async (req, res) => {
  try {
    const _id = req.params._id;
    const todoData = await ToDo.findByIdAndDelete(_id);
    res.status(200).json(todoData);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

module.exports = todo_router;
