import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="background">
      <div className="titlesContainer">
        <div className="landingTitle">
          <h1>Welcome to the FoodApp</h1>
        </div>

        <div className="landingSubTitle">
          <h3>SPOONCULAR API by M. Angel Villamil</h3>
        </div>

        <br />

        <p className="landingDescription">
          Bienvenido/a a la aplicación construida como parte de mi proceso de aprendizaje como desarrollador Full Stack en el bootcamp de Henry.
          <br />
          En esta aplicación podrá navegar entre 100 recetas, y crear sus propias recetas también. Espero que le guste y la disfrute usandola tanto como yo haciendola.
        </p>
      </div>

      <Link className="landingButton" to={"/home"}>
        Let's see!
      </Link>
    </div>
  );
};
