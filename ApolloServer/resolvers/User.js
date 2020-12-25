const { getRepository } = require("typeorm");
const { User } = require("../../build/entities/User");

const resolvers = {
  Query: {
    user: (parent, { email, userId }) => {
      const params = email ? { email: email } : { userId: userId };
      return getRepository(User).findOne(params);
    },
  },
};

module.exports = resolvers;
