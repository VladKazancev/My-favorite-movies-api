const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    userId: ID!
    email: String!
    password: String!
  }
  extend type Query {
    user(email: String, userId: ID): User
  }
`;

module.exports = typeDefs;
