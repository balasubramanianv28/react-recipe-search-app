import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";

export default function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("recipe-favourites") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "recipe-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  function toggleFavourite(recipe) {
    setFavourites((previous) => {
      const exists = previous.some(
        (item) => item.idMeal === recipe.idMeal
      );

      return exists
        ? previous.filter(
          (item) => item.idMeal !== recipe.idMeal
        )
        : [...previous, recipe];
    });
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">RecipeBook</Link>

        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/favourites">
            Favourites ({favourites.length})
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/recipes"
          element={
            <Recipes
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route
          path="/recipes/:id"
          element={
            <RecipeDetail
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          }
        />

        <Route
          path="*"
          element={<h2 className="message">Page not found</h2>}
        />
      </Routes>
    </>
  );
}