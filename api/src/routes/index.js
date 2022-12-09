const { Router } = require('express');
const router = Router();


// Importar todos los routers;

const recipeRouter = require("./recipeRouter.route");
const dietRouter = require("./dietRouter.route");

// Configurar los routers

router.use("/recipes", recipeRouter);
router.use("/diets", dietRouter);

module.exports = router;
