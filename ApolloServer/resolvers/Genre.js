const { getRepository } = require("typeorm");
const { FavoriteGenre } = require("../../build/entities/FavoriteGenre");

const resolvers = {
  Query: {
    getGenres: async (parent, { language }, context) => {
      const urlPart = [
        "genre/movie/list",
        context.requestKeysPart(language),
      ].join("");
      return (await context.getResponse(urlPart)).genres;
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
    setFavoriteGenres: (parent, { userId, genreId, deleteMode }) => {
      const genreRepository = getRepository(FavoriteGenre);
      const params = { userId: userId, genreId: genreId };
      if (deleteMode) genreRepository.delete(params);
      else genreRepository.save(params);
      return genreId;
    },
  },
};

module.exports = resolvers;
