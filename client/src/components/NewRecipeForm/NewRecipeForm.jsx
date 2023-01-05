import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getDiets, postRecipes } from "../../actions/actions";


export default function NewRecipeForm() {

  const dispatch = useDispatch();
  const allDiets = useSelector(state => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    stepByStep: [{ step: 1, do: "" }],
    diet: [],
  });

  const handleChange = (event) => {

    if(event.target.name === "diet") { 
      
      let array = [...input.diet]
  
      if (event.target.checked) {
        array.push(event.target.value)
      } else {
        array = array.filter(diet => diet !== event.target.value)
      }
      
      setInput({
        ...input,
        diet: array
      });
    } else if(!event.target.name.includes("stepByStep")) {
 
      setInput({
        ...input,
        [event.target.name]: event.target.value
      })
    }
    
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();

    const { name, image, summary, healthScore, stepByStep, diet} = input;

    if (name !== ""
    && image !== ""
    && summary !== ""
    && stepByStep !== [{ step: 1, do: "" }]
    && diet !== [] ) {
      
      dispatch(postRecipes(input))
      history.push("./home");

    } else {
      alert("Please enter all the required information.");
    }
  
  }

  const handleClick = () => {
    
    let cache = input.stepByStep;

    cache.push({step: input.stepByStep.length + 1, do:""})

    setInput({
      ...input,
      stepByStep: cache
    })
  }

  const handleStepChange = (event, number) => {

    let cache = input.stepByStep;

    cache[number - 1] = {...cache[number - 1], do: event.target.value}

    setInput({
      ...input,
      stepByStep: cache
    })
  }

  useEffect(() => {
    dispatch(getDiets())
  }, [])

  return (
    <div>
      <Link className="link" to={"/home"}>
        Home
      </Link>

      <h1>A new recipe is coming...</h1>

      <form onChange={handleChange} onSubmit={handleSubmit}>

        <div>
          <label>Recipe name</label>
          <input type="text" value={input.name} name="name" />
        </div>

        <div>
          <label>Image URL</label>
          <input type="text" value={input.image} name="image" />
        </div>

        <div>
          <label>Summary</label>
          <input type="text" value={input.summary} name="summary" />
        </div>

        <div>
          <label>Health Score</label>
          <input type="range" value={input.healthScore} name="healthScore" />
        </div>

        <legend>Match your recipe with our diets:</legend>

        {allDiets?.map(({ name }, key) => {
          name = name[0].toUpperCase() + name.slice(1);

          return (
            <div>
              <input type="checkbox" key={key} value={name} name="diet" />
              <label> {name} </label>
            </div>
          )
        })}

        <button type="submit">Aceptar</button>
        <button type="reset">Resetear</button>

        <legend>Tell us about how to make it!</legend>

        {input.stepByStep?.map(step => (

            <div key={`step ${step.step}`}>

              <label>Step {step.step}:</label>
              <textarea type="text" value={step.do} name="stepByStep" onChange={(event) => handleStepChange(event, step.step)}/>

            </div>
          ))}

        <button onClick={handleClick}>+</button>
      </form>
    </div>
  );
}
