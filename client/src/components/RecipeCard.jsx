import React, { useState } from "react";

const RecipeCard = ({recipe}) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <article className="bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full max-w-3xl mx-auto my-6 flex flex-col md:flex-row">
      {/* Image */}
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full md:w-1/3 aspect-[4/3] object-cover"
      />

      {/* Content */}
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
          <p className="text-gray-700 mb-3">{recipe.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>

          <p className="text-gray-600 mb-1">
            <strong>Type:</strong> {recipe.recipeType}
          </p>
          <p className="text-gray-600 mb-3">
            <strong>Goal:</strong> {recipe.fitnessGoal}
          </p>

          <p className="text-gray-700 mb-3">
            {showFull ? recipe.instructions : recipe.instructions.slice(0, 100) + "..."}
          </p>

          <button
            onClick={() => setShowFull(!showFull)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            {showFull ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
