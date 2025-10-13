import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

const RecipeCard = ({recipe}) => {
  const { userFavorites, addFavorite, removeFavorite } = useFavorites();
  const [showFull, setShowFull] = useState(false);
  const isFavorite = userFavorites.includes(recipe._id);

const handleFavorite = () => {
  if (isFavorite) removeFavorite(recipe._id);
  else addFavorite(recipe._id);
};

  return (
    <article className="bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full max-w-3xl mx-auto my-6 flex flex-col md:flex-row">
      {/* Image */}
      <div className="relative w-full md:w-1/2">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover md:min-h-full"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 text-3xl cursor-pointer transition-transform hover:scale-125"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
        <p className="text-gray-700">{recipe.description}</p>

        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
            >
              {ingredient}
            </span>
          ))}
        </div>

        <p className="text-gray-600">
          <strong>Type:</strong> {recipe.recipeType}
        </p>
        <p className="text-gray-600">
          <strong>Goal:</strong> {recipe.fitnessGoal}
        </p>

        <p className="text-gray-700">
          {showFull
            ? recipe.instructions
            : recipe.instructions.slice(0, 100) + "..."}
        </p>

        <button
          onClick={() => setShowFull(!showFull)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
        >
          {showFull ? "Read less" : "Read more"}
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
