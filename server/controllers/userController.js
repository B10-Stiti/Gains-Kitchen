import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const [user, recipeCount] = await Promise.all([
      User.findById(req.params.id).lean(),
      Recipe.countDocuments({ userId: req.params.id }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      code: "API.user.success",
      message: "User found successfully",
      data: { user, recipeCount },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while fetching user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { profilePicture, username, bio, fitnessGoal } = req.body;
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          profilePicture,
          username,
          bio,
          fitnessGoal,
        },
      }
    );
    res.status(200).json({
      code: "API.user.success",
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      code: "API.user.failed",
      message: "Error while updating user",
      error: err.message,
    });
  }
};

// Favorites
export const getUserFavorites = async (req, res) => {
  try {
    // find user and populate the favorites array with actual Recipe documents
    const user = await User.findById(req.params.id).populate("favorites");
    if (!user) {
      return res.status(404).json({ 
        code : "API.user.failed",
        message: "User not found" });
    }
    return res.status(200).json({
      code: "API.user.success",
      message: "Fav recipes found successfully",
      data: user.favorites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while fetching user favorites" });
  }
};

export const addFavoriteRecipe = async (req, res) => {
  try {
    const { id, recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId).lean();
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.status(200).json({
      code: "API.user.success",
      message: "Fav recipe added successfully",
      data: user.favorites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while adding favorite recipe" });
  }
};

export const removeFavoriteRecipe = async (req, res) => {
  try {
    const { id, recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId).lean();
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== recipeId
    );
    await user.save();

    res.status(200).json({
      code: "API.user.success",
      message: "Fav recipe deleted successfully",
      data: user.favorites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while deleting favorite recipe" });
  }
};
