const { getRepository } = require("typeorm");
const { ApolloError } = require("apollo-server-express");
const { FavoriteGenre } = require("../../build/entities/FavoriteGenre");
const { genresUrlPart } = require("../utils");

const resolvers = {
  Query: {
    genres: async (parent, { language }, { getResponse, user }) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      const urlPart = genresUrlPart(language);
      const genres = await getResponse(urlPart);
      return genres ? genres.genres : [];
    },
    favoriteGenres: async (parent, args, { user }) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      const favoriteGenres = await getRepository(FavoriteGenre).find({
        userId: user.id,
      });
      return favoriteGenres.map((current) => current.genreId);
    },
  },
  Mutation: {
    setFavoriteGenres: async (
      parent,
      { genreId },
      { generateAnswer, user }
    ) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      const genreRepository = getRepository(FavoriteGenre);
      const params = { userId: user.id, genreId };
      const favoriteGenre = await genreRepository.findOne(params);
      if (favoriteGenre) genreRepository.delete(params);
      else genreRepository.save(params);
      return generateAnswer("Ok");
    },
  },
};

module.exports = resolvers;
