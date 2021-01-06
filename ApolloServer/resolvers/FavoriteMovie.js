const { getRepository } = require("typeorm");
const { ApolloError } = require("apollo-server-express");
const { FavoriteMovie } = require("../../build/entities/FavoriteMovie");

const resolvers = {
  Query: {
    favoriteMovies: (parent, args, { user }) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      return getRepository(FavoriteMovie).find({
        where: { userId: user.id },
        order: { id: "ASC" },
      });
    },
  },
  Mutation: {
    setFavoriteMovies: async (
      parent,
      { movieId },
      { generateAnswer, user }
    ) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      const favoriteMovieRepository = getRepository(FavoriteMovie);
      const params = { userId: user.id, movieId };
      if (await favoriteMovieRepository.findOne(params))
        favoriteMovieRepository.delete(params);
      else favoriteMovieRepository.save(params);
      return generateAnswer("Ok");
    },
    setIsFavoriteMovieViewed: async (
      parent,
      { movieId },
      { generateAnswer, user }
    ) => {
      if (!user) throw new ApolloError("Authorization failed.", "UNAUTORIZED");
      const favoriteMovieRepository = getRepository(FavoriteMovie);
      const favoriteMovie = await favoriteMovieRepository.findOne({
        userId: user.id,
        movieId,
      });
      if (favoriteMovie) {
        favoriteMovie.isViewed = !favoriteMovie.isViewed;
        favoriteMovieRepository.save(favoriteMovie);
        return generateAnswer("Ok");
      } else return generateAnswer("Error", "This movie is not a favorite");
    },
  },
};

module.exports = resolvers;
