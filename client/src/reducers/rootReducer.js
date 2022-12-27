const initialState = {
  recipes: [],
  diets: [],
  recipe: {},

  filterByDiet: "All Diets",
  orderBy: {
    order: "asc",
    type: undefined,
  },

  searchValue: ""
};


export default function rootReducer (state = initialState, action) {
  
  switch (action.type) {
    case "GET_RECIPES":
      return { ...state, recipes: action.payload };

    case "GET_DIETS":
      return { ...state, diets: action.payload };

    case "GET_RECIPE":
      return { ...state, recipe: action.payload };

    case "FILTER_BY_DIET":
      return { ...state, filterByDiet: action.payload };

    case "SET_ORDER_BY":
      return { ...state, orderBy: action.payload };

    case "SET_SEARCH_VALUE":
      return { ...state, searchValue: action.payload };

    default:
      return state;
  }
}