import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../../actions/actions";
import RecipeCard from "../RecipeCard/RecipeCard";

import PageButtons from "../PageButtons/PageButtons";
import Navbar from "../Navbar/Navbar";
import "./Home.css"

export default function Home() {

  // REDUX ////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);
  /////////////////////////////////////////////////////////////

  // PAGINATION ///////////////////////////////////////////////
  const actualFirstRecipe = () => (currentPage - 1) * 9;
  const actualLastRecipe = () => actualFirstRecipe() + 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const definePage = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setCurrentRecipes(allRecipes.slice(actualFirstRecipe(), actualLastRecipe()));
    setPagesNumber(Math.ceil(allRecipes.length / 9));
  }, [allRecipes, currentPage]);
  /////////////////////////////////////////////////////////////


  return (
    <div className="container">

      <div className="NavContainer">
        <Navbar diets={allDiets} />
      </div>

      
      <div className="cardsContainer">

        <div className="cards">
          {currentRecipes?.map(({ id, name, image, diets }) => (
            <RecipeCard key={id} name={name = name} image={image} diets={diets} />
            ))}
        </div>

        <PageButtons pagesNumber={pagesNumber} currentPage={currentPage} changePage={definePage} />
      
      </div>

    </div>
  );
}