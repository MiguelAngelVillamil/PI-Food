const initialState = {
  recipes: [],
  diets: [],

  filterByDiet: "All Diets"
}


export default function rootReducer (state = initialState, action) {
  
  switch (action.type) {
    case "GET_RECIPES":
      return { ...state, recipes: action.payload };

    case "GET_DIETS":
      return { ...state, diets: action.payload };

    case "FILTER_BY_DIET":
      return { ...state, filterByDiet: action.payload };

    default:
      return state;
  }
}