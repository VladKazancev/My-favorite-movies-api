const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String
  }
  extend type Query {
    getGenres(language: String!): [Genre!]!
    checkFavoriteGenre(userId: ID!, genreId: ID!): Boolean!
  }
  extend type Mutation {
    setFavoriteGenres(userId: ID!, genreId: ID!): Answer!
  }
`;

module.exports = typeDefs;
