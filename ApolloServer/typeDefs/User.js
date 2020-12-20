const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    email: String!
    password: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  type Query {
    getUser(email: String!): User
  }
  type Mutation {
    addUsers(users: [UserInput]!): [User]!
  }
`;

module.exports = typeDefs;
