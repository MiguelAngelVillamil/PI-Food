export const getRecipes = () => {

  return async (dispatch) => {

    let json = await fetch("http://localhost:3001/recipes").then(response => response.json());
  
    return dispatch({ type: "GET_RECIPES", payload: json })
  }
}

export const getDiets = () => {
  return async (dispatch) => {
    let json = await fetch("http://localhost:3001/diets").then((response) => response.json());

    return dispatch({ type: "GET_DIETS", payload: json });
  };
};

export const filterByDiet = (diet) => {
  return (dispatch) => dispatch({ type: "FILTER_BY_DIET", payload: diet });
};