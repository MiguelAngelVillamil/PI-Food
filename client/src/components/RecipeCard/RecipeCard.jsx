import "./RecipeCard.css"

export default function RecipeCard({name, image, diets}) {

  return (
    <div className="card">
      <img src={image} alt="Recipe.jpg not found" />
      <div className="infoContainer">
        <h3>{name}</h3>
        <div id="diets">
          {diets.map((diet, key) => <h5 key={key}>{diet.toUpperCase()}</h5>)} 
        </div>
      </div>
    </div>
  )
}