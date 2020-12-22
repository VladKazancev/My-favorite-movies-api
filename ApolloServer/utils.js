const fetch = require("node-fetch");

const requestKeysPart = (language) =>
  ["?api_key=", process.env.API_KEY, "&language=", language].join("");

exports.getResponse = async (urlPart) => {
  const URL = [process.env.API_URL, urlPart].join("");
  const response = await fetch(URL);
  if (response.ok) return response.json();
};

exports.genresUrlPart = (language) => {
  return ["genre/movie/list", requestKeysPart(language)].join("");
};

exports.movieUrlPart = (language, id) => {
  return ["movie/", id, requestKeysPart(language)].join("");
};

exports.filteredMoviesUrlPart = (language, page, queryKeys) => {
  const formatedGenres = queryKeys.selectedGenres.join(",");
  return [
    "discover/movie/",
    requestKeysPart(language),
    "&include_adult=true&sort_by=popularity.desc&page=",
    page,
    "&primary_release_year=",
    queryKeys.releaseYear,
    "&vote_average.gte=",
    queryKeys.rating,
    "&with_genres=",
    formatedGenres,
  ].join("");
};

exports.generateAnswer = (status, text) => {
  const message = status === "Ok" ? "Success" : text;
  return { status: status, message: message };
};
