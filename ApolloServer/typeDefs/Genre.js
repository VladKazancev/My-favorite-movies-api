const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String
  }
  extend type Query {
    genres(language: String!): [Genre!]!
    favoriteGenres: [Int]!
  }
  extend type Mutation {
    setFavoriteGenres(genreId: ID!): Answer!
  }
`;

module.exports = typeDefs;
