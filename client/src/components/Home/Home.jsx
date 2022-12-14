import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../../actions/actions";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./Home.css"

export default function Home() {
  
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const allDiets = useSelector(state => state.diets);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getRecipes());
    dispatch(getDiets());
  };

  return (
    <div>
      <Link to={"/recipe"}>Crear receta</Link>
      <h1>Comidas/recetas</h1>
      <button onClick={(event) => handleClick(event)}>Volver a cargar todas las recetas</button>

      <div>

        <select>
          <option value={"asc"}>Ascendente</option>
          <option value={"dsc"}>Descendente</option>
        </select>

        <select>
          <option value={"alf"}>Orden alfabetico</option>
        </select>

        <select>
          <option value={"scr"}>Health Score</option>
        </select>

      </div>

      <div>
        <select name="Diets">
          {allDiets?.map((diet, key) => <option key={key} value={diet.name} > {diet.name} </option>)}
        </select>
      </div>

      <div className="cards">
        {allRecipes?.map(({ id, name, image, diets }) => (
          <RecipeCard key={id} name={name} image={image} diets={diets} />
        ))}
      </div>
    </div>
  );
}