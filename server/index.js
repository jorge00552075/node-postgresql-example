const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const todoRouter = require('./routes/todoRoutes');
const CustomAPIError = require('./errors/custom-error');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/todos', todoRouter);
app.all('*', (req, res, next) => {
  next(new CustomAPIError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
