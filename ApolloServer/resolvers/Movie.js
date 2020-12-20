const { getRepository } = require("typeorm");
const { FavoriteMovie } = require("../../build/entities/FavoriteMovie");

const resolvers = {
  Query: {
    getMovieById: async (parent, { id, language }, context) => {
      const urlPart = ["movie/", id, context.requestKeysPart(language)].join(
        ""
      );
      const movieInfo = await context.getResponse(urlPart);
      movieInfo.production_companies = movieInfo.production_companies.map(
        (current) => current.name
      );
      return movieInfo;
    },
    getFilteredMovies: async (
      parent,
      { language, page, queryKeys },
      context
    ) => {
      const formatedGenres = queryKeys.selectedGenres.join("%2C%20");
      const urlPart = [
        "discover/movie/",
        context.requestKeysPart(language),
        "&include_adult=true&sort_by=popularity.desc&page=",
        page,
        "&primary_release_year=",
        queryKeys.releaseYear,
        "&vote_average.gte=",
        queryKeys.rating,
        "&with_genres=",
        formatedGenres,
      ].join("");
      return (await context.getResponse(urlPart)).results;
    },
    getFavoriteMovies: (parent, { userId }) => {
      return getRepository(FavoriteMovie).find({
        userId: userId,
      });
    },
  },
  Mutation: {
    setFavoriteMovies: async (parent, { userId, movieId, deleteMode }) => {
      const movieRepository = getRepository(FavoriteMovie);
      let movie = await movieRepository.findOne({
        userId: userId,
        movieId: movieId,
      });
      if (deleteMode) movieRepository.delete(movie);
      else {
        if (movie) movie.isViewed = !movie.isViewed;
        else movie = { userId: userId, movieId: movieId, isViewed: false };
        movieRepository.save(movie);
      }
      return movie;
    },
  },
};

module.exports = resolvers;
