import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const url = "/api/user/" + user._id + "/favorites";
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
      setUserFavorites(rep.data);
    };
    fetchFavRecipes();
  }, []);

  if (userFavorites.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 px-4">
        <p className="text-gray-500 text-3xl">No favorite recipes yet.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-300 text-gray-900 min-h-[calc(100vh-160px)] px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          My <span className="text-red-500">Favorites</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userFavorites.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={(removedId) =>
                setUserFavorites(
                  userFavorites.filter((r) => r._id !== removedId)
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
