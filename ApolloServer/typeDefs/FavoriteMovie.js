const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type FavoriteMovie {
    movieId: ID!
    isViewed: Boolean!
  }
  type Query {
    getFavoriteMovies(userId: ID!): [FavoriteMovie]!
  }
  type Mutation {
    setFavoriteMovies(userId: ID!, movieId: ID!): Answer!
    setIsFavoriteMovieViewed(userId: ID!, movieId: ID!): Answer!
  }
`;

module.exports = typeDefs;
