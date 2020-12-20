const fetch = require("node-fetch");

const generateRequestKeysPart = (language) =>
  ["?api_key=", process.env.API_KEY, "&language=", language].join("");

const getResponse = async (urlPart) => {
  const URL = [process.env.API_URL, urlPart].join("");
  const response = await fetch(URL);
  return response.json();
};

const context = () => ({
  requestKeysPart: generateRequestKeysPart,
  getResponse: getResponse,
});

module.exports = context;
