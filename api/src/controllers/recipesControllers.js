const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));
const { Recipe, Diet } = require("../db");

const getApiRecipes = async () => {

  const { ENDPOINT_RECIPES, API_KEY_01, API_KEY_02, API_KEY_03, API_KEY_LUCHO } = process.env;

  const apiData = await fetch(`${ENDPOINT_RECIPES}complexSearch?apiKey=${API_KEY_03}&number=100&offset=100&addRecipeInformation=true`)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((element) => {
        return {
          id: element.id,
          name: element.title,
          image: element.image,
          summary: element.summary,
          healthScore: element.healthScore,
          diets: element.diets,
          stepByStep: element.analyzedInstructions[0]?.steps.map((step) => {
            return {
              step: step.number,
              do: step.step,
            };
          }),
        };
      })
    );

  return apiData;
}

const getDbRecipes = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  }).then((data) => data.map( element => {
      return {
        ...element.dataValues,
        diets: element.dataValues.diets.map((diet) => diet.name),
      };
    })
  );
};

const getAllRecipes = async () => {
  let api = await getApiRecipes();
  let db = await getDbRecipes();
  return [...api, ...db];
};

module.exports = {
  getAllRecipes
};
