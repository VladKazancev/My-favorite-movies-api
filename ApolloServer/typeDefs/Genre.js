const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String
  }
  extend type Query {
    genres(language: String!): [Genre!]!
    favoriteGenres(userId: ID!): [Int]!
  }
  extend type Mutation {
    setFavoriteGenres(userId: ID!, genreId: ID!): Answer!
  }
`;

module.exports = typeDefs;
