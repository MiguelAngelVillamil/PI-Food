import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../actions/actions";
import "./RecipeInformation.css";

export default function RecipeInformation() {

  const dispatch = useDispatch(); 
  const { name, image, summary, healthScore, diets, stepByStep} = useSelector((state) => state.recipe);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id))
  }, [id])


  return (
    <div className="recipeInfoContainer">

      <div className="infoCard" >

        <h1>{name}</h1>

        <div id="dietsInfo">
          {diets?.map(diet => <h5 key={diet}> {diet} </h5> )}
        </div>

        <span> Health Score: {healthScore}</span>

        <img src={image} alt={`Image of ${name}`} />

        <div className="infoContainer" >

          <p>{summary}</p>

          <div>
            {stepByStep?.map(step => (
              <div key={step.step}>
                <h4>Step: {step.step}</h4>
                <p> {step.do} </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
