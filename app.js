const createError = require("http-errors");
const express = require("express");
const jwt = require("express-jwt");
const cors = require("cors");
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
  context: ({ req }) => ({
    getResponse: getResponse,
    generateAnswer: generateAnswer,
    user: req.user,
  }),
});

const auth = jwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

app.use(logger("dev"));
app.use("/graphql", cors(), auth);

server.applyMiddleware({ app });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).end();
});

module.exports = app;
