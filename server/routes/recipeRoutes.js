import express from "express";
import { createRecipe, getRecipes } from "../controllers/recipeController.js";

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getRecipes);

export default router;
