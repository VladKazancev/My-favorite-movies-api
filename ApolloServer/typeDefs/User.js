const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    userId: ID!
    email: String!
    password: String!
  }
  extend type Query {
    getUser(email: String!): User
  }
`;

module.exports = typeDefs;
