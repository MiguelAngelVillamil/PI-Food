import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

import { filterByDiet, setOrderBy, setSearchValue } from "../../actions/actions";

export default function Navbar({ diets }) {
  const dispatch = useDispatch();
  const orderBy = useSelector((state) => state.orderBy);

  const handleSearch = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.target.value));
  };

  const handleOrder = (type) => {
    let cache = { ...orderBy };

    if (orderBy.type === type) {
      cache.order = orderBy.order === "asc" ? "dsc" : "asc";
    }

    if (orderBy.type !== type) cache.type = type;

    dispatch(setOrderBy(cache));
  };

  return (
    <nav className="navbar">
      <h1 className="title">Food App</h1>

      <input className="searchbar" type="text" onChange={handleSearch} placeholder="Search by title" />

      <button onClick={() => handleOrder("name")}>
        <span>Alphabetical</span>
        {orderBy.type === "name" && <span>{orderBy.order === "asc" ? "^" : "v"}</span>}
      </button>

      <button onClick={() => handleOrder("healthScore")}>
        <span>Health Score</span>
        {orderBy.type === "healthScore" && <span>{orderBy.order === "asc" ? "^" : "v"}</span>}
      </button>

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

      <hr />

      <Link className="link" to={"/newRecipe"}>
        New recipe
      </Link>
    </nav>
  );
}
