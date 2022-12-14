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