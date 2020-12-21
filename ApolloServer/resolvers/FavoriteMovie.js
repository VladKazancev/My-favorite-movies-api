const { getRepository } = require("typeorm");
const { FavoriteMovie } = require("../../build/entities/FavoriteMovie");

const resolvers = {
  Query: {
    getFavoriteMovies: (parent, { userId }) => {
      return getRepository(FavoriteMovie).find({
        userId: userId,
      });
    },
  },
  Mutation: {
    setFavoriteMovies: async (
      parent,
      { userId, movieId },
      { generateAnswer }
    ) => {
      const favoriteMovieRepository = getRepository(FavoriteMovie);
      const params = { userId: userId, movieId: movieId };
      if (await favoriteMovieRepository.findOne(params))
        favoriteMovieRepository.delete(params);
      else favoriteMovieRepository.save(params);
      return generateAnswer("Ok");
    },
    setIsFavoriteMovieViewed: async (
      parent,
      { userId, movieId },
      { generateAnswer }
    ) => {
      const favoriteMovieRepository = getRepository(FavoriteMovie);
      const favoriteMovie = await favoriteMovieRepository.findOne({
        userId: userId,
        movieId: movieId,
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
