const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Status {
    Ok
    Error
  }
  type Answer {
    status: Status!
    message: String!
  }
`;

module.exports = typeDefs;
