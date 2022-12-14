import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos a FoodApp</h1>

      <Link to={"/home"}>
        <button>Home</button>
      </Link>
    </div>
  );
};
