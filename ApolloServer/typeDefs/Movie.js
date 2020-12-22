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
    ): [Movie!]!
  }
`;

module.exports = typeDefs;
