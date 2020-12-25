const { movieUrlPart } = require("../utils");
const { filteredMoviesUrlPart } = require("../utils");

const resolvers = {
  Query: {
    movie: async (parent, { id, language }, { getResponse }) => {
      const urlPart = movieUrlPart(language, id);
      const movieInfo = await getResponse(urlPart);
      if (movieInfo)
        movieInfo.production_companies = movieInfo.production_companies.map(
          (current) => current.name
        );
      return movieInfo;
    },
    filteredMovies: async (
      parent,
      { language, page, queryKeys },
      { getResponse }
    ) => {
      const urlPart = filteredMoviesUrlPart(language, page, queryKeys);
      const filteredMovies = await getResponse(urlPart);
      return filteredMovies ? filteredMovies.results : [];
    },
  },
};

module.exports = resolvers;
