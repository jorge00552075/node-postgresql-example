const db = require('../db');

const asyncWrapper = require('../middleware/async');
const CustomAPIError = require('../errors/custom-error.js');

const createTodo = asyncWrapper(async (req, res, next) => {
  const newTodo = await db.query(
    'INSERT INTO todo (description) VALUES($1) RETURNING *',
    [req.body.description]
  );

  res.status(200).json({ todo: newTodo.rows[0] });
});

const getAllTodos = asyncWrapper(async (req, res, next) => {
  const allTodos = await db.query('SELECT * FROM todo');

  res.status(200).json({ results: allTodos.rowCount, todos: allTodos.rows });
});

const getTodo = asyncWrapper(async (req, res, next) => {
  const todo = await db.query('SELECT * FROM todo WHERE todo_id = $1', [
    req.params.id,
  ]);

  if (todo.rows.length === 0) {
    return next(new CustomAPIError(`No todo with id : ${req.params.id}`, 404));
  }

  res.status(200).json(todo.rows[0]);
});

const updateTodo = asyncWrapper(async (req, res, next) => {
  const todo = await db.query(
    'UPDATE todo SET description = $1 WHERE todo_id = $2',
    [req.body.description, req.params.id]
  );

  // RETURN CUSTOM ERROR

  res.status(200).json({ todo });
});

const deleteTodo = asyncWrapper(async (req, res, next) => {
  await db.query('DELETE FROM todo WHERE todo_id = $1', [req.params.id]);

  // RETURN CUSTOM ERROR

  res.status(204).json({});
});

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
