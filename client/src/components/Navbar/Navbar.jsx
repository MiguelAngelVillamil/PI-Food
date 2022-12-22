import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({diets}) {
  return (
    <nav>
      <Link className="link" to={"/home"}>
        <h1>Food App</h1>
      </Link>

      <label htmlFor="Órden alfabético">
        <input type="radio" name="typeSelection" /> Órden alfabético
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

      <select>
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
