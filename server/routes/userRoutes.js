import express from "express";
import { getUser, updateUser, getUserFavorites, addFavoriteRecipe, removeFavoriteRecipe} from "../controllers/userController.js";

const router = express.Router();

router.put("/:id", updateUser);
router.get("/:id", getUser);

router.get('/:id/favorites', getUserFavorites);
router.post('/:id/favorites/:recipeId', addFavoriteRecipe);
router.delete('/:id/favorites/:recipeId', removeFavoriteRecipe);

export default router;
