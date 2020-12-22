const { getRepository } = require("typeorm");
const { FavoriteGenre } = require("../../build/entities/FavoriteGenre");
const { genresUrlPart } = require("../utils");

const resolvers = {
  Query: {
    getGenres: async (parent, { language }, { getResponse }) => {
      const urlPart = genresUrlPart(language);
      const genres = await getResponse(urlPart);
      return genres ? genres.genres : [];
    },
    checkFavoriteGenre: async (parent, { userId, genreId }) => {
      const genre = await getRepository(FavoriteGenre).findOne({
        genreId: genreId,
        userId: userId,
      });
      return Boolean(genre);
    },
  },
  Mutation: {
    setFavoriteGenres: async (
      parent,
      { userId, genreId },
      { generateAnswer }
    ) => {
      const genreRepository = getRepository(FavoriteGenre);
      const params = { userId: userId, genreId: genreId };
      const favoriteGenre = await genreRepository.findOne(params);
      if (favoriteGenre) genreRepository.delete(params);
      else genreRepository.save(params);
      return generateAnswer("Ok");
    },
  },
};

module.exports = resolvers;
