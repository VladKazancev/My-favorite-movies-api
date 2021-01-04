const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type FavoriteMovie {
    movieId: ID!
    isViewed: Boolean!
  }
  type Query {
    favoriteMovies: [FavoriteMovie]!
  }
  type Mutation {
    setFavoriteMovies(movieId: ID!): Answer!
    setIsFavoriteMovieViewed(movieId: ID!): Answer!
  }
`;

module.exports = typeDefs;
