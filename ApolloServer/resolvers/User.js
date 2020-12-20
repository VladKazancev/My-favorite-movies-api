const { getRepository } = require("typeorm");
const { User } = require("../../build/entities/User");

const resolvers = {
  Query: {
    getUser: (parent, { email }) => {
      return getRepository(User).findOne({ email: email });
    },
  },
  Mutation: {
    addUsers: (parent, { users }) => {
      getRepository(User).insert(users);
      return users;
    },
  },
};

module.exports = resolvers;
