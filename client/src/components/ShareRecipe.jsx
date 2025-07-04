import React, { useState } from "react";

const ShareRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (name) => {
    setIngredients(ingredients.filter((i) => i !== name));
  };

  const recipeTypes = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
    "Pre-Workout",
    "Post-Workout",
    "Dessert",
  ];
  const fitnessGoals = ["Bulking", "Cutting", "Maintenance", "Muscle Gain"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation
    if (
      !title.trim() ||
      !description.trim() ||
      !imageUrl.trim() ||
      ingredients.length === 0 ||
      !recipeType.trim() ||
      !fitnessGoal.trim() ||
      !instructions.trim()
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (!user) {
      alert("Please log in to share a recipe.");
      return;
    }
    const recipeData = {
      userId: user._id,
      title,
      description,
      imageUrl,
      ingredients,
      recipeType,
      fitnessGoal,
      instructions,
    };
    console.log(recipeData)
    const url = "/api/recipes";
    const res = await fetch(url, {
      // this works without base_url, because we use proxy in vite config
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      console.error("Error:", res.status, res.statusText);
      return;
    }

    setTitle("");
    setDescription("");
    setImageUrl("");
    setIngredients([]);
    setIngredientInput("");
    setRecipeType("");
    setFitnessGoal("");
    setInstructions("");
  };

  return (
    <div className="border border-gray-200 rounded-md p-6 bg-gray-100 shadow max-w-2xl mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-gray-900"
      >
        {/* Title */}
        <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Recipe title"
        />

        {/* Upload Image */}
        <label className="font-semibold">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="mb-2"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-48 h-auto rounded shadow mb-4"
          />
        )}

        {/* Description */}
        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 h-20 resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Short description of the recipe"
        />

        {/* Ingredients */}
        <label className="font-semibold">Ingredients</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="e.g. oats"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddIngredient}
            className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ing, idx) => (
            <span
              key={idx}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {ing}
              <button
                type="button"
                onClick={() => handleRemoveIngredient(ing)}
                className="font-bold hover:text-red-300"
                aria-label={`Remove ingredient ${ing}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Recipe Type */}
        <select
          value={recipeType}
          onChange={(e) => setRecipeType(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            Recipe Type
          </option>
          {recipeTypes.map((type, idx) => (
            <option value={type} key={idx}>
              {type}
            </option>
          ))}
        </select>

        {/* Fitness Goal */}
        <select
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            Fitness Goal
          </option>
          {fitnessGoals.map((goal, idx) => (
            <option value={goal} key={idx}>
              {goal}
            </option>
          ))}
        </select>

        {/* Instructions */}
        <label className="font-semibold">Instructions</label>
        <textarea
          required
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Step by step instructions"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded px-6 py-3 transition"
        >
          Share Recipe
        </button>
      </form>
    </div>
  );
};

export default ShareRecipe;
