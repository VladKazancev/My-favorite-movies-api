const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    userId: ID!
    email: String!
    password: String!
  }
  extend type Query {
    user: User
  }
  extend type Mutation {
    login(email: String!, password: String!): String!
  }
`;

module.exports = typeDefs;
