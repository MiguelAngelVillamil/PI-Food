import { useState, useEffect } from "react";
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
  },[]);
  /////////////////////////////////////////////////////////////

  // FILTER BY DIET ///////////////////////////////////////////

  const [filteredRecipesByDiet, setFilteredRecipesByDiet] = useState(allRecipes);

  const filterByDiet = useSelector((state) => state.filterByDiet);

  useEffect(() => {
    
    filterByDiet === "All Diets" 
    ? setFilteredRecipesByDiet(allRecipes)
    : setFilteredRecipesByDiet(allRecipes.filter(recipe => recipe.diets.some(diet => diet.toLowerCase() === filterByDiet.toLowerCase())))
    
  }, [filterByDiet, allRecipes]);

  /////////////////////////////////////////////////////////////

  // FILTER BY NAME ///////////////////////////////////////////

  const [filteredRecipes, setFilteredRecipes] = useState(filteredRecipesByDiet);

  const searchValue = useSelector(state => state.searchValue);

  const filterByTitle = () => {

    let cache = [ ...filteredRecipesByDiet ];

    cache = cache.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()))

    setFilteredRecipes(cache);
  }

  useEffect(() => {
    filterByTitle();
  }, [searchValue, filteredRecipesByDiet])
  /////////////////////////////////////////////////////////////

  // ORDER ////////////////////////////////////////////////////

  const orderBy = useSelector((state) => state.orderBy);

  const orderByProp = () => {
    
    const { type } = orderBy;

    let cache = [ ...filteredRecipes ];

    cache.sort((a, b) => {
      if(a[type] < b[type]) return orderBy.order === "asc" ? -1 : 1; 
      if(a[type] > b[type]) return orderBy.order === "asc" ? 1 : -1; 
      return 0;
    })

    setFilteredRecipes(cache);
  }

  useEffect(() => {
    orderByProp();
  }, [orderBy])

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
    setCurrentRecipes(filteredRecipes.slice(actualFirstRecipe(), actualLastRecipe()));
    setPagesNumber(Math.ceil(filteredRecipes.length / 9));
  }, [filteredRecipes, currentPage]);
  /////////////////////////////////////////////////////////////


  return (
    <div className="container">
      <div className="NavContainer">
        <Navbar diets={allDiets} />
      </div>

      <div className="cardsContainer">
        <div className="cards">
          {currentRecipes?.map(({ id, name, image, diets, healthScore }) => (
            <RecipeCard key={id} name={name} image={image} diets={diets} healthScore={healthScore} id={id} />
          ))}
        </div>

        <PageButtons pagesNumber={pagesNumber} currentPage={currentPage} changePage={definePage} />
      </div>
    </div>
  );
}