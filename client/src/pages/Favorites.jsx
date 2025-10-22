import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Favorites = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const { userFavorites } = useFavorites();

  useEffect(() => {
    const fetchFavRecipes = async () => {
      if (!userFavorites.length) {
        setFavRecipes([]);
        return;
      }
      const idsParam = userFavorites.join(",");
      const res = await fetch(`/api/recipes?ids=${idsParam}`);
      const rep = await res.json();
      console.log(rep);
      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        return;
      }
      setFavRecipes(rep.data);
    };
    fetchFavRecipes();
  }, [userFavorites]);
  console.log(userFavorites)

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header showSearch={false} />

      <div className="flex-1 flex flex-col">
        {favRecipes.length === 0 ? (
          <div className="flex items-center justify-center flex-1 px-4">
            <p className="text-gray-500 text-3xl font-semibold text-center">
              No favorite recipes yet.
            </p>
          </div>
        ) : (
          <section className="text-gray-900 px-4 sm:px-8 py-8 mt-16 flex-1">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">
                My <span className="text-red-500">Favorites</span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {favRecipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Favorites;
