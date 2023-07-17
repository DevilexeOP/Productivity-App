/* eslint-disable prettier/prettier */
const todo_router = require('express').Router();
const toDos = require('../models/Todos');

// Get Route
todo_router.route('/').get((req, res) => {
  toDos
    .find()
    .then(todos => res.json(todos))
    .catch(error => {
      res.status(400).json('Error' + error);
    });
});

// Add new todo
todo_router.route('/add').post((req, res) => {
  const {todoTitle, todoDescription, todopriority, todoStatus, createdAt} =
    req.body;

  // new obj
  const todo = new toDos({
    todoTitle,
    todoDescription,
    todoStatus,
    todopriority,
    createdAt,
  });

  todo
    .save()
    .then(() => res.status(200).json('Todo Added'))
    .catch(err => res.status(400).json('Error adding todo' + err));
});

module.exports = todo_router;
