const express = require('express');

const {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

// http://localhost:3000/api/v1/todos
router.route('/').get(getAllTodos).post(createTodo);

// http://localhost:3000/api/v1/todos/1
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
