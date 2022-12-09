const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));
const { Recipe, Diet } = require("../db");

const getApiDiets = async () => {
  const { ENDPOINT_RECIPES, API_KEY_01, API_KEY_02, API_KEY_03 } = process.env;
  
  let diets = await Diet.findAll();

  if(diets.length) return diets;

  console.log("entro")
  const apiData = await fetch(`${ENDPOINT_RECIPES}complexSearch?apiKey=${API_KEY_03}&number=100&offset=100&addRecipeInformation=true`)
    .then((response) => response.json())
    .then((data) => data.results.map((element) => element.diets));

  const dietsArray = [...new Set(apiData.flat())];

  dietsArray.forEach( diet => {
    Diet.findOrCreate({
      where: { name: diet }
    })
  })

  return await Diet.findAll();
};

module.exports = {
  getApiDiets
};

