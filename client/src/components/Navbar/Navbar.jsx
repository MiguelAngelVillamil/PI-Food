import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Navbar.css";

import { filterByDiet } from "../../actions/actions";

export default function Navbar({diets}) {
  
  const dispatch = useDispatch();

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.target.value));
  }
  
  
  
  return (
    <nav>
      <Link className="link" to={"/home"}>
        <h1>Food App</h1>
      </Link>

      <label htmlFor="Órden alfabético">
        <button> Órden alfabético </button>
      </label>

      <label htmlFor="Health Score">
        <input type="radio" name="typeSelection" /> Health Score
      </label>

      <hr />

      <label htmlFor="Ascendente">
        <input type="radio" name="order" /> Ascendente
      </label>

      <label htmlFor="Descendente">
        <input type="radio" name="order" /> Descendente
      </label>

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

      <Link className="link" to={"/recipe"}>
        Crear receta
      </Link>
    </nav>
  );
}
