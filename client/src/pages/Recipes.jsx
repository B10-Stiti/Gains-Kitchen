import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/recipes";
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const rep = await res.json();
      console.log(rep);
      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        return;
      }
      setRecipes(rep.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          // isFavorite={userFavorites.includes(recipe._id)}
        />
      ))}
    </div>
  );
};

export default Recipes;
