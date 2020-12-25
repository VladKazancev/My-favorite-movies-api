const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    genres: [Genre]
    genre_ids: [Int!]
    poster_path: String
    production_companies: [String]
    release_date: String
    vote_average: Float
    adult: Boolean
    overview: String
  }
  input QueryKeys {
    selectedGenres: [String]!
    releaseYear: Int!
    rating: Float!
  }
  extend type Query {
    movie(id: ID!, language: String!): Movie
    filteredMovies(
      language: String!
      page: Int!
      queryKeys: QueryKeys!
    ): [Movie!]!
  }
`;

module.exports = typeDefs;
