const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./ApolloServer/typeDefs");
const resolvers = require("./ApolloServer/resolvers");
const { getResponse, generateAnswer } = require("./ApolloServer/utils");
const addUsers = require("./utils");

require("reflect-metadata");
require("dotenv").config();
const { createConnection } = require("typeorm");

const app = express();

createConnection().then(() => addUsers());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    getResponse: getResponse,
    generateAnswer: generateAnswer,
  }),
});
server.applyMiddleware({ app });

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
