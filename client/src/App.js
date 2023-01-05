import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import RecipeInformation from "./components/RecipeInformation/RecipeInformation";
import Home from "./components/Home/Home";
import NewRecipeForm from "./components/NewRecipeForm/NewRecipeForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/newRecipe">
            <NewRecipeForm />
          </Route>
          <Route path="/:id">
            <RecipeInformation />
          </Route>

          <Route path="*">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
