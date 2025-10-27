import express from "express";
import { getUser, updateUser, getUserFavorites, addFavoriteRecipe, removeFavoriteRecipe} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/:id", protect, updateUser);
router.get("/:id", protect, getUser);

router.get('/:id/favorites', protect, getUserFavorites);
router.post('/:id/favorites/:recipeId', protect, addFavoriteRecipe);
router.delete('/:id/favorites/:recipeId', protect, removeFavoriteRecipe);

export default router;
