import { Link } from "react-router-dom"
import "./RecipeCard.css"

export default function RecipeCard({name, image, diets, healthScore, id}) {

  return (

    <Link to={`${id}`}>
      <div className="card" >
        <img src={image} alt="Recipe.jpg not found" />
        <span> HS: {healthScore} </span>
        <div className="infoContainer">
          <h3>{name}</h3>
          <div id="diets">
            {diets.map((diet, key) => <h5 key={key}>{diet.toUpperCase()}</h5>)} 
          </div>
        </div>
      </div>
    </Link>
  )
}