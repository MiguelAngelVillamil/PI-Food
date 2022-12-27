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

export const getRecipe = (id) => {
  return async (dispatch) => {
    let json = await fetch(`http://localhost:3001/recipes/${id}`).then((response) => response.json());

    return dispatch({ type: "GET_RECIPE", payload: json });
  };
};

export const filterByDiet = (diet) => {
  return (dispatch) => dispatch({ type: "FILTER_BY_DIET", payload: diet });
};

export const setOrderBy = (order) => {
  return (dispatch) => dispatch({ type: "SET_ORDER_BY", payload: order });
};

export const setSearchValue = (searchValue) => {
  return (dispatch) => dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue });
};