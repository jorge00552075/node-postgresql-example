const express = require("express");
const morgan = require("morgan");
// npm i express-rate-limit
// npm i helmet
// npm i xss
// npm i hpp
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();

const todoRouter = require("./routes/todoRoutes");
const AppError = require("./errors/appError");
const errorHandlerMiddleware = require("./middleware/error-handler");
//////////////////////////////
const app = express();

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(compression());

// Routes
app.use("/api/v1/todos", todoRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
