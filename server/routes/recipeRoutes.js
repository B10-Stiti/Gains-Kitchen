import express from "express";
import { createRecipe, getRecipes } from "../controllers/recipeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRecipe);
router.get("/", getRecipes);

export default router;
