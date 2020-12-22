const { getRepository } = require("typeorm");
const { User } = require("../../build/entities/User");

const resolvers = {
  Query: {
    getUser: (parent, { email }) => {
      return getRepository(User).findOne({ email: email });
    },
  },
};

module.exports = resolvers;
