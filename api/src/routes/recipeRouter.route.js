const { Router } = require("express");
const { getAllRecipes } = require("../controllers/recipesControllers");
const { Recipe, Diet } = require("../db");

const router = Router();


// GET METHODS ////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  const name = req.query.name
  
  if(!name) res.status(200).json(await getAllRecipes());
  else {
    const recipes = await getAllRecipes();

    let filteredRecipes = recipes.filter((recipe) => recipe.name.toUpperCase().includes(name.toUpperCase()));

    if (filteredRecipes.length) res.status(200).send(filteredRecipes);
    else res.status(404).send("No tenemos recetas que incluyan ese nombre.");
  }
});

router.get("/:idReceta", async (req, res) => {
  const idReceta = req.params.idReceta;

  
  const recipes = await getAllRecipes();

  let filteredRecipe = recipes.filter((recipe) => recipe.id.toString() === idReceta.toString());

  if (filteredRecipe.length) res.status(200).send(filteredRecipe);
  else res.status(404).send("La receta que estás buscando no existe o ha sido eliminada.");
 
});

///////////////////////////////////////////////////////////////////////////////////

// POST METHODS ///////////////////////////////////////////////////////////////////

router.post("/", async (req, res) => {
  const {id, name, image, summary, healthScore, stepByStep, createdIdDB, diet} = req.body;

  const newRecipe = await Recipe.create({
    id,
    name,
    image,
    summary,
    healthScore,
    stepByStep,
    createdIdDB,
  });

  const newDiet = await Diet.findAll({
    where: { name: diet }
  })

  newRecipe.addDiet(newDiet);

  res.status(200).send("Tu receta se ha añadido con éxito");
})

///////////////////////////////////////////////////////////////////////////////////

module.exports = router;