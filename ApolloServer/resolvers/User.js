const { getRepository } = require("typeorm");
const { User } = require("../../build/entities/User");
const { AuthenticationError, ApolloError } = require("apollo-server-express");
const jsonWebToken = require("jsonwebtoken");

const resolvers = {
  Query: {
    user: (parent, args, { user }) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      return getRepository(User).findOne({ userId: user.id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const userData = await getRepository(User).findOne({ email: email });
      if (!userData) throw new AuthenticationError("unknownUser");
      if (userData.password !== password)
        throw new AuthenticationError("wrongPassword");
      return jsonWebToken.sign(
        { id: userData.userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
    },
  },
};

module.exports = resolvers;
