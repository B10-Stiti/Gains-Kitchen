import express from "express";
import Recipe from "../models/Recipe.js";

const router = express.Router();

router.post("/", async (req, res) => {
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
        data: {
          recipe: recipe,
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to add Recipe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during Adding Recipe" });
  }
});

export default router;
