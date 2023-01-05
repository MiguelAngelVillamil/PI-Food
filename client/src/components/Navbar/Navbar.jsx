import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

import { filterByDiet, setOrderBy, setSearchValue } from "../../actions/actions";

export default function Navbar({diets}) {
  
  const dispatch = useDispatch();
  const orderBy = useSelector((state) => state.orderBy);

  const handleSearch = (event) => {
    dispatch(setSearchValue(event.target.value));
  }

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.target.value));
  }
  
  const handleOrder = (type) => {

    let cache = { ...orderBy }

    if (orderBy.type === type) {
      cache.order = orderBy.order === "asc" ? "dsc" : "asc"
    }

    if (orderBy.type !== type) cache.type = type

    dispatch(setOrderBy(cache))
  }
  
  return (
    <nav>
      <Link className="link" to={"/home"}>
        <h1>Food App</h1>
      </Link>

      <input type="text" onChange={handleSearch} />

      <button onClick={() => handleOrder("name")}> Órden alfabético </button>

      <button onClick={() => handleOrder("healthScore")}> Health Score </button>

      <hr />

      <select defaultValue={"All Diets"} onChange={handleFilterbyDiet}>
        <option value="All Diets">All Diets</option>

        {diets?.map(({ name }, key) => {
          name = name[0].toUpperCase() + name.slice(1);

          return (
            <option key={key} value={name}>
              {name}
            </option>
          );
        })}
      </select>

      <Link className="link" to={"/newRecipe"}>
        Crear receta
      </Link>
    </nav>
  );
}
