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
    const { search, type, goal } = req.query;

    const filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (type) filter.recipeType = type;
    if (goal) filter.fitnessGoal = goal;

    const recipes = await Recipe.find(filter);

    return res.status(200).json({
      code: recipes.length > 0 ? "API.Recipes.success" : "API.Recipes.empty",
      message: recipes.length > 0 ? "Fetched recipes successfully" : "No recipes found",
      data: recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "API.Recipes.error",
      message: "Error during fetching recipes",
    });
  }
};
