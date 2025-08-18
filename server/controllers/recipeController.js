import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      ingredients,
      recipeType,
      fitnessGoal,
      instructions,
      userId,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !imageUrl?.trim() ||
      !ingredients.length ||
      !recipeType?.trim() ||
      !fitnessGoal?.trim() ||
      !instructions?.trim()
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const recipe = await Recipe.create({
      userId,
      title,
      description,
      imageUrl,
      ingredients,
      recipeType,
      fitnessGoal,
      instructions,
    });
    if (recipe) {
      return res.status(201).json({
        code: "API.Recipes.success",
        message: "Recipe added successfully",
        data: recipe,
      });
    } else {
      return res.status(400).json({
        code: "API.Recipes.failed",
        message: "Failed to add Recipe",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during Adding Recipe" });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    if (recipes) {
      return res.status(200).json({
        code: "API.Recipes.success",
        message: "Fetched recipes successfully",
        data: recipes,
      });
    } else {
      return res.status(404).json({
        code: "API.Recipes.empty",
        message: "No recipes found",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "API.Recipes.error",
      message: "Error during fetching recipes",
    });
  }
};
