const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    genres: [Genre]
    poster_path: String
    production_companies: [String]
    release_date: String
    vote_average: Float
    adult: Boolean
    overview: String
  }
  type FavoriteMovie {
    movieId: ID!
    isViewed: Boolean!
  }
  input QueryKeys {
    selectedGenres: [Int]!
    releaseYear: Int!
    rating: Float!
  }
  extend type Query {
    getMovieById(id: ID!, language: String!): Movie
    getFilteredMovies(
      language: String!
      page: Int!
      queryKeys: QueryKeys!
    ): [Movie]!
    getFavoriteMovies(userId: ID!): [FavoriteMovie]!
  }
  extend type Mutation {
    setFavoriteMovies(
      userId: ID!
      movieId: ID!
      deleteMovie: Boolean
    ): FavoriteMovie!
  }
`;

module.exports = typeDefs;
